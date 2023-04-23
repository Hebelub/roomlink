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

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<View style={styles.messagecontainer}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('MyModal', {
								userId: createdBy,
							})
						}>
						<UserAvatar
							photoURL={user?.photoURL}
							size={50}
						/>
					</TouchableOpacity>

					<View style={styles.messageContainer}>
						<Text style={styles.messageText}>{text}</Text>
						<Text style={styles.dateText}>{getElapsedTimeSince(createdAt)}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {},
	messagecontainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
		backgroundColor: "#90EE9000",
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
		backgroundColor: 'transparent',

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
	messageText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#1A202C",
	},
	dateText: {
		fontSize: 12,
		color: "#4A5568",
		marginTop: 4,
	},
});

export default ChatMessage;
