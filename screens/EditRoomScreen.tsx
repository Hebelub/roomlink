import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigator/RootNavigator';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Room } from '../types';


type EditRoomScreenRouteProp = RouteProp<RootStackParamList, "EditRoom">;

const EditRoomScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<EditRoomScreenRouteProp>();

    const [roomName, setRoomName] = useState(roomProps.name);
    const [roomDescription, setRoomDescription] = useState(roomProps.description);
    const [roomImageUrl, setRoomImageUrl] = useState(roomProps.imageUrl);

    const navigation = useNavigation<RootStackNavigationProp>();

    const updateRoom = async () => {
        
        if (roomName === ''){
            alert('Enter a room name!'); 
            return;
        }

        try {
            const room = {
                name: roomName,
                code: roomProps.code,
                description: roomDescription,
                createdAt: new Date(),
                imageUrl: roomImageUrl,
                createdById: roomProps.createdById,
            }

            await setDoc(doc(db, "rooms", roomProps.code), room);

            navigation.replace("Room", { roomProps: room });

        } catch (e) {
            console.error("Error setting document: ", e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

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

            <TouchableOpacity
                onPress={() => { updateRoom() }}
                style={styles.button}
            >
                <Text>Edit Room</Text>
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

export default EditRoomScreen;
