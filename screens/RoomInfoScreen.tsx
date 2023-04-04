import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image } from "@rneui/themed";

type RoomInfoScreenRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const RoomInfoScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomInfoScreenRouteProp>();

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
        fontSize: 100,
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