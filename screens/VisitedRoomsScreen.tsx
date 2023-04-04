import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/base';
import VisitListItem from '../components/VisitListItem';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Room } from '../types';
import { Icon } from '@rneui/themed';


async function getRoom(roomId: string): Promise<Room | null> {
    const collectionRef = collection(db, "rooms");
    const documentRef = doc(collectionRef, roomId);

    try {
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return data as Room;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving document: ", error);
        return null;
    }
}

const VisitedRoomsScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    const [roomCode, setRoomCode] = useState('');

    const joinRoom = () => {

        getRoom(roomCode).then((room) => {
            console.log("room", room);
            if (room) {
                navigation.navigate("RoomScreen", { roomProps: room })
            } else {
                alert("Room does not exist");
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Navigate to the profile screen */}
            <TouchableOpacity
                onPress={() => { navigation.navigate("ProfileScreen") }}
                style={[styles.button, styles.buttonOutline, styles.width]}
            >
                <Text>Profile</Text>
            </TouchableOpacity>

            <Text style={styles.header}>List of rooms you have visited</Text>

            {/* List of rooms */}

            <View style={styles.spacing} />

            <Text style={styles.header}>Join a room</Text>
            <View style={styles.sideBySide}>
                <TextInput
                    placeholder="Enter room code"
                    value={roomCode}
                    onChangeText={text => { setRoomCode(text) }}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={() => { joinRoom() }}
                    style={styles.button}
                >
                    <Icon
                        name="entypo-controller-play"
                        type="entypo"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("ScanQrCodeScreen") }}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Icon
                        name="entypo-camera"
                        type="entypo"
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default VisitedRoomsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    width: {
        width: 300,
    },
    input: {
        height: 50,
        width: 300,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        width: 40,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    spacing: {
        height: 50,
    },
    sideBySide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})