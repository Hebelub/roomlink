import {
	TouchableWithoutFeedback,
	TextInput,
	Keyboard,
	StatusBar,
	FlatList,
	SafeAreaView,
	ScrollView,
	Text,
	KeyboardEvent,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import VisitorCard from "../components/VisitorCard";
import ChatMessage from "../components/ChatMessage";
import EditRoomButton from "../components/EditRoomButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import {
	RoomNavigatorRouteProp,
	RoomNavigatorScreenNavigationProp,
} from "../navigator/RoomNavigator";
import { auth, db } from "../firebase";
import { Button } from "@rneui/base";
import {
	addDoc,
	collection,
	doc,
	setDoc,
	onSnapshot,
	query,
	orderBy,
} from "firebase/firestore";
import { Message } from "../types";

const RoomChatScreen = () => {
	const {
		params: { roomProps },
	} = useRoute<RoomNavigatorRouteProp>();

	const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();
	const [input, setInput] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);

	const messagesRef = collection(doc(collection(db, "rooms"), roomProps.code), "messages");

	useEffect(() => {
		const chatQuery = query(messagesRef, orderBy("createdAt"));

		const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
			const newMessages = snapshot.docs.map((doc) => ({
				id: doc.id,
				createdBy: doc.data().createdBy,
				createdAt: doc.data().createdAt.toDate(),
				text: doc.data().text,
			}));
			setMessages(newMessages);
		});

		return unsubscribe;
	}, []);

	const isOwner = roomProps.createdById === auth.currentUser?.uid;
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => isOwner && <EditRoomButton roomProps={roomProps} />,
		});
	}, [navigation]);

	const sendMessage = () => {
		Keyboard.dismiss();

		const message: Message = {
			createdBy: auth.currentUser?.displayName ?? "",
			createdAt: new Date(),
			text: input,
		};

		addDoc(messagesRef, message);

		setInput("");
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={130}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<View style={styles.contentContainer}></View>

						<FlatList
							data={messages}
							renderItem={({ item }) => (
								<ChatMessage
									createdBy={item.createdBy}
									createdAt={item.createdAt}
									text={item.text}
								/>
							)}
						/>
						<View style={[styles.footer]}>
							<TextInput
								placeholder="write a message"
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
								style={[styles.textInput, {}]}
							/>
							<TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default RoomChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		//flexGrow: 1,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
		borderTopColor: "#DDDDDD",
		backgroundColor: "#FFF",
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		borderColor: "transparent",
		borderWidth: 1,
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
});
