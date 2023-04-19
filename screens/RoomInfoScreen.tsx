import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RoomNavigatorRouteProp, RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { auth } from '../firebase';
import EditRoomButton from '../components/EditRoomButton';
import RoomQrCode from '../components/RoomQrCode';
import useUser from '../hooks/useUser';
import * as Clipboard from 'expo-clipboard';

const RoomInfoScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                isOwner && <EditRoomButton roomProps={roomProps} />
            ),
        });
    }, [navigation]);

    const user = useUser(roomProps.createdById);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{roomProps.name}</Text>

            <View style={styles.spacing} />

            <Text style={styles.description}>{roomProps.description}</Text>

            <View style={styles.spacing} />

            {/* <Text>The room was created at {roomProps.createdAt.toDateString()}</Text> */}

            <TouchableOpacity onPress={() => (Clipboard.setStringAsync(roomProps.code))} style={styles.qrContainer}>
                <Text style={styles.codeText}>{roomProps.code}</Text>
                <RoomQrCode code={roomProps.code} />
            </TouchableOpacity>

            <Text style={styles.createdBy}>Created By {user?.displayName}</Text>
        </View>
    )
}

export default RoomInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
    },
    codeText: {
        fontSize: 60,
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
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
    },

    createdBy: {
        fontSize: 16,
        marginTop: 20,
    },
    spacing: {
        height: 20,
    }
})
