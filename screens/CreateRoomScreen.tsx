import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const CreateRoomScreen = () => {
    // Should contain:
    // 1. An inputfield to enter a room name
    // 2. An inputfield to enter a room description
    // 3. Show the generated room code
    // 4. Show the generated QR-code
    // 5. A button to create the room

    const [roomName, setRoomName] = useState('');
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <Text>CreateRoomScreen</Text>

            <TextInput
                placeholder="Enter Room Name"
                value={roomName}
                onChangeText={text => { setRoomName(text) }}
                style={styles.input}
            />

            <Text>Generated Code</Text>
            <Text>RXcN4</Text>

            <Text>Generated QR-Code</Text>
            <Text>THIS WILL BE A GENERATED QR-CODE</Text>

            <TouchableOpacity
                onPress={() => { navigation.navigate("RoomScreen") }}
                style={styles.button}
            >
                <Text>Create Room</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

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

export default CreateRoomScreen
