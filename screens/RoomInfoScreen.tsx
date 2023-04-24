
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RoomNavigatorRouteProp, RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { auth, db } from '../firebase';
import RoomQrCode from '../components/RoomQrCode';
import useUser from '../hooks/useUser';
import * as Clipboard from 'expo-clipboard';
import EditableText from '../components/EditableText';
import { ToastAndroid } from 'react-native';
import { Iso } from '@mui/icons-material';
import { doc, setDoc } from 'firebase/firestore';

const RoomInfoScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const createdRoomUser = useUser(roomProps.createdById);
    const currentUser = useUser();
    const isOwner = roomProps.createdById === currentUser?.uid;

    const [roomName, setRoomName] = useState(roomProps.name);
    const [roomDescription, setRoomDescription] = useState(roomProps.description);

    const updateRoom = async () => {
        if (roomName.trim() === '') {
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
                code: roomProps.code,
                description: roomDescription.trim(),
                createdAt: new Date(),
                imageUrl: roomProps.imageUrl,
                createdById: roomProps.createdById,
            }

            await setDoc(doc(db, "rooms", roomProps.code), room);
        } catch (e) {
            console.error("Error setting document: ", e);
        }
    }

    useEffect(() => {
        updateRoom();
    }, [roomName, roomDescription])

    return (
        <ScrollView style={{ backgroundColor: 'lightgreen' }}>
            <View style={styles.container}>
                <EditableText
                    initialText={roomProps.name}
                    containerStyle={styles.container}
                    textStyle={styles.header}
                    enableEdit={isOwner}
                    onAccept={(newText) => {
                        setRoomName(newText);
                    }}
                />

                <EditableText
                    initialText={roomProps.description}
                    containerStyle={styles.container}
                    textStyle={styles.description}
                    enableEdit={isOwner}
                    onAccept={(newText) => {
                        setRoomDescription(newText);
                    }}
                />

                <View style={styles.spacing} />

                <TouchableOpacity onPress={() => {
                    Clipboard.setStringAsync(roomProps.code);
                    ToastAndroid.show('Room code copied!', ToastAndroid.SHORT);
                }} style={styles.qrContainer}>
                    <Text style={styles.codeText}>{roomProps.code}</Text>
                    <RoomQrCode code={roomProps.code} />
                </TouchableOpacity>

                <View style={styles.CreatedContainer}>
                    <Text style={styles.createdBy}>Created By</Text>
                    <Text style={styles.displayName}>{createdRoomUser?.displayName}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default RoomInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: "center",
        alignItems: 'center',
    },
    header: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 50,
        fontWeight: '100',
        textAlign: 'center',
        padding: 1,

    },
    description: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#333',
        fontWeight: '200',
    },
    codeText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    qrContainer: {
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

    CreatedContainer: {
        alignItems: 'center',
        justifyContent: 'center',

        padding: 10,

        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.2,
            height: 0.3,
        },
        shadowRadius: 4,
        elevation: 5,
        marginTop: 40,
    },
    createdBy: {
        // styles for the "Created By" text
        fontSize: 15,
        fontWeight: '200',
        color: '#333',

    },
    displayName: {
        // styles for the user's display name
        fontSize: 28,
        fontWeight: '200',
        color: '#333',

    },
    spacing: {
        height: 20,
    }
})