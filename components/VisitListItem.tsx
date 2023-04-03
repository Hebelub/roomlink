import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigator/RootNavigator';
import { RoomProps, TabStackParamList } from '../navigator/TabNavigator';

type Props = {
    roomProps: RoomProps;
}

const VisitListItem = ({ roomProps }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("RoomScreen", { roomProps: roomProps })
            }}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text>{roomProps.roomName}</Text>

        </TouchableOpacity>
    )
}

export default VisitListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        width: 300,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginTop: 10,
    },
})
