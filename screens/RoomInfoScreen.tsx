
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
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
        <ScrollView style={{ backgroundColor: 'lightgreen' }}>
            <View style={styles.container}>
                <View style={styles.headerContainer} >
                    <Text style={styles.header}>{roomProps.name}</Text>
                </View>

                <View style={styles.spacing} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{roomProps.description}</Text>
                </View>
                <View style={styles.spacing} />

                {/* <Text>The room was created at {roomProps.createdAt.toDateString()}</Text> */}

                <TouchableOpacity onPress={() => (Clipboard.setStringAsync(roomProps.code))} style={styles.qrContainer}>
                    <Text style={styles.codeText}>{roomProps.code}</Text>
                    <RoomQrCode code={roomProps.code} />
                </TouchableOpacity>

                <View style={styles.CreatedContainer}>
                    <Text style={styles.createdBy}>Created By </Text>
                    <Text style={styles.displayName}>{user?.displayName}</Text>
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
    },
    headerContainer: {

    },
    header: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 50,
        fontWeight: '800',
        textAlign: 'center',
        padding: 1,
    },
    description: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#333',
        marginTop: 1,
        padding: 2,
        fontWeight: '200',

    },

    codeText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    descriptionContainer: {

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
        fontSize: 28,
        fontWeight: '200',
        color: '#333',
        marginBottom: 10,

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