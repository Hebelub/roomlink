import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { Image } from "@rneui/themed"


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateString = (length: number) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const CreateRoomScreen = () => {

    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomImageUrl, setRoomImageUrl] = useState('');

    // TODO: The room code should also check if if will woverride an existing room. If so, generate a new one.
    const [roomCode, setRoomCode] = useState(generateString(6));

    const userUid = auth.currentUser?.uid ?? "";

    const navigation = useNavigation<RootStackNavigationProp>();

    const createRoom = async () => {

        try {
            const room = {
                name: roomName,
                code: roomCode,
                description: roomDescription,
                createdAt: new Date(),
                imageUrl: roomImageUrl,
                createdById: userUid,
            }

            navigation.navigate("RoomScreen", { roomProps: room });

            await setDoc(doc(db, "rooms", roomCode), room);

        } catch (e) {
            console.error("Error setting document: ", e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>Create New Room</Text>

            <TextInput
                placeholder="Enter Room Name"
                value={roomName}
                onChangeText={text => { setRoomName(text) }}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter Room Description (optional)"
                value={roomDescription}
                onChangeText={text => { setRoomDescription(text) }}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter Image Url (optional)"
                value={roomImageUrl}
                onChangeText={text => { setRoomImageUrl(text) }}
                style={styles.input}
            />

            <View style={styles.spacing} />

            <Text style={styles.header}>Code</Text>
            <Text style={styles.codeText}>{roomCode}</Text>

            <Image
                source={{ uri: "https://ponderwall.com/wp-content/uploads/2022/05/Qrcode.png" }}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.spacing} />

            <TouchableOpacity
                onPress={() => { createRoom() }}
                style={styles.button}
            >
                <Text>Create Room</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        width: 300,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginTop: 10,
    },
    codeText: {
        marginTop: -20,
        fontSize: 80,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    spacing: {
        height: 50,
    }
})

export default CreateRoomScreen
