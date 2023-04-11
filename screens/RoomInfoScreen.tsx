import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image } from "@rneui/themed";
import { auth } from '../firebase';
import EditRoomButton from '../components/EditRoomButton';

type RoomInfoScreenRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const RoomInfoScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomInfoScreenRouteProp>();

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (isOwner && <EditRoomButton />),
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

            <Image
                source={{ uri: "https://ponderwall.com/wp-content/uploads/2022/05/Qrcode.png" }}
                style={{ width: 200, height: 200 }}
            />

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