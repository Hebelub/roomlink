import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import RoomQrCode from '../components/RoomQrCode';

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

        if (roomName === '') {
            alert('Enter room name!');
            return;
        }
        if (roomDescription.trim().length > 100) {
            alert('Room description should be less than 100 characters!')
            return;
        }

        try {
            const room = {
                name: roomName,
                code: roomCode,
                description: roomDescription.trim(),
                createdAt: new Date(),
                imageUrl: roomImageUrl,
                createdById: userUid,
            }

            navigation.replace("Room", { roomProps: room });

            await setDoc(doc(db, "rooms", roomCode), room);

        } catch (e) {
            console.error("Error setting document: ", e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.codeContainer}>
                {/* RoomCode */}
                <View style={styles.roomCodeContainer}>
                    <RoomQrCode code={roomCode} size={220} />
                    <Text style={styles.roomCodeText}>{roomCode}</Text>
                </View>
            </Text>

            {/**   <Text style={styles.header}>Create New Room</Text>   */}


            <TextInput
                placeholder="Enter Room Name"
                value={roomName}
                onChangeText={text => { setRoomName(text) }}
                style={[styles.input, styles.inputroomName]}
            />

            <TextInput
                placeholder="Enter Room Description (optional)"
                value={roomDescription}
                onChangeText={text => { setRoomDescription(text) }}
                style={styles.input}
            />
            {/**           <TextInput
                placeholder="Enter Image Url (optional)"
                value={roomImageUrl}
                onChangeText={text => { setRoomImageUrl(text) }}
                style={styles.input}
            />
 */}

            <TouchableOpacity
                onPress={() => { createRoom() }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Create Room</Text>
            </TouchableOpacity>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {


        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        // marginTop: 0,
    }, codeContainer: {
        //flex: 1,
        marginTop: -240,
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        //  marginTop: 0,
    },

    roomCodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
    },
    roomCodeText: {
        fontSize: 34,
        fontWeight: '400',
        //marginLeft: 20,
        marginTop: 10,
        paddingBottom: 20,
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
    },
    inputroomName: {
        marginTop: 20,

    },
    input: {
        width: '80%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#008CBA',
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateRoomScreen;