import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RoomNavigatorScreenNavigationProp } from "../navigator/RoomNavigator";
import { Message } from "../types";
import { dark } from "@mui/material/styles/createPalette";
import { Image } from "@rneui/themed";
import useUser from "../hooks/useUser";
import { getElapsedTimeSince } from "./VisitListItem";
import UserAvatar from "./UserAvatar";

type ChatMessageProps = {
	text: string;
	createdBy: string;
	createdAt: Date;
}

const ChatMessage = ({ text, createdBy, createdAt }: ChatMessageProps) => {
	const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

	const user = useUser(createdBy);
	const sender = useUser();
	const isSender = sender?.uid === createdBy;

	return (
		<View style={styles.container}>

			<View style={[
				styles.messagecontainer,
				isSender ? styles.sender : styles.receiver]}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('MyModal', {
							userId: createdBy,
						})
					}>
					<UserAvatar
						photoURL={user?.photoURL}
						size={30}
					/>
				</TouchableOpacity>
				<View style={styles.messageContainer}>
					<Text style={styles.displayName}>{user?.displayName}</Text>
					<Text style={styles.messageText}>{text}</Text>
					<Text style={styles.dateText}>{getElapsedTimeSince(createdAt)}</Text>
				</View>

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	messagecontainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginVertical: 8,
	},

	avatarText: {
		fontWeight: "bold",
		fontSize: 20,
		color: "#4A5568",
	},
	messageContainer: {
		marginLeft: 16,
		marginRight: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "white",

		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 10,
			height: 18,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 6,
		flex: 1,
	},
	sender: {
		// justifyContent: "flex-start",
		// marginLeft: "auto",

		flexDirection: "row-reverse",
		justifyContent: "flex-end",
	},
	receiver: {
		justifyContent: "flex-end",
		marginRight: "auto",
	},
	messageText: {
		fontSize: 16,
		color: "#1A202C",
	},
	dateText: {
		fontSize: 12,
		color: "#4A5568",
		marginBottom: 2,
		alignSelf: 'flex-end',
	},
	displayName: {
		fontWeight: "bold",
		fontSize: 13,
		color: '#4A5568',
		marginBottom: 5,
	},
});

export default ChatMessage;
