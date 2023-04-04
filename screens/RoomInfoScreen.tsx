import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';

type RoomInfoScreenRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const RoomInfoScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomInfoScreenRouteProp>();

    return (
        <View style={styles.container}>
            <Text>{roomProps.name}</Text>
            <Text>{roomProps.code}</Text>
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
})