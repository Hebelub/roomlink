import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RoomNavigatorRouteProp, RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { auth } from '../firebase';
import EditRoomButton from '../components/EditRoomButton';
import RoomQrCode from '../components/RoomQrCode';


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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{roomProps.name}</Text>

            <View style={styles.spacing} />

            <Text>{roomProps.description}</Text>

            <View style={styles.spacing} />

            {/* <Text>The room was created at {roomProps.createdAt.toDateString()}</Text> */}

            <Text style={styles.codeText}>{roomProps.code}</Text>

            <RoomQrCode code={roomProps.code} />

            <Text>Created By {roomProps.createdById}</Text>
        </View>
    )
}

export default RoomInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        fontSize: 80,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    spacing: {
        height: 20,
    }
})