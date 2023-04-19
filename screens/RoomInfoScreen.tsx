import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RoomNavigatorRouteProp, RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { auth } from '../firebase';
import EditRoomButton from '../components/EditRoomButton';
import RoomQrCode from '../components/RoomQrCode';
import useUser from '../hooks/useUser';

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
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{roomProps.description}</Text>
            </View>
            <View style={styles.spacing} />

            {/* <Text>The room was created at {roomProps.createdAt.toDateString()}</Text> */}

            <View style={styles.qrContainer}>
                <Text style={styles.codeText}>{roomProps.code}</Text>
                <RoomQrCode code={roomProps.code} />
            </View>
            <View style={styles.CreatedContainer}>
                <Text style={styles.createdBy}>Created By </Text>
                <Text style={styles.displayName}>{user?.displayName}</Text>
            </View>

        </View>
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
    header: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        color: '#333', // set color to black or your preferred color
        marginTop: 10, // add margin to separate from other elements

    },

    codeText: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    descriptionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
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

    CreatedContainer: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,


        marginTop: 40,
    },

    createdBy: {
        // styles for the "Created By" text
        fontSize: 38,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    displayName: {
        // styles for the user's display name
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    spacing: {
        height: 20,
    }
})