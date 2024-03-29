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
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
	RoomNavigatorRouteProp,
	RoomNavigatorScreenNavigationProp,
} from "../navigator/RoomNavigator";
import { auth, db } from "../firebase";
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
	const flatListRef = useRef<FlatList>(null);

	useLayoutEffect(() => {
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

	const sendMessage = () => {
		if (!auth.currentUser) {
			navigation.navigate("Login");
			return;
		}

		if (input.trim() === '') {
			//alert('write a message!'); 
			return;
		}
		Keyboard.dismiss();

		const message: Message = {
			createdBy: auth.currentUser?.uid ?? "unknown",
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

						<FlatList ref={flatListRef}
							data={messages}
							onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
							{(input === "") ?
								<Ionicons name="send" size={24} color="#EEEEEE" /> :
								<TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
									<Ionicons name="send" size={24} color="#2B68E6" />
								</TouchableOpacity>
							}
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
		backgroundColor: "lightgreen"
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
