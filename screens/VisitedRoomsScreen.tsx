import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/base';
import VisitListItem from '../components/VisitListItem';

const VisitedRoomsScreen = () => {

    // Should contain:
    // 1. A list of rooms that the logged in user has visited
    // 2. A button to go to the scan QR-code screen
    // 3. An inputfield to enter a room code and a button to join that room

    const navigation = useNavigation<any>();

    const [roomCode, setRoomCode] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Navigate to the profile screen */}
            <TouchableOpacity
                onPress={() => { navigation.navigate("ProfileScreen") }}
                style={styles.button}
            >
                <Text>GOTO: Profile</Text>
            </TouchableOpacity>

            <Text>List of rooms you have visited</Text>

            <ScrollView>
                <VisitListItem roomProps={{ roomName: 'My First Room', roomCode: "123427" }} />
                <VisitListItem roomProps={{ roomName: 'Citchen number 241', roomCode: "248523" }} />
                <VisitListItem roomProps={{ roomName: 'Barnabases Visit Card', roomCode: "774286" }} />
                <VisitListItem roomProps={{ roomName: 'Information about statue', roomCode: "247591" }} />
                <VisitListItem roomProps={{ roomName: 'Study Group', roomCode: "582938" }} />
            </ScrollView>

            <View>
                <Text>Enter room code</Text>
                <TextInput
                    placeholder="Enter room code"
                    value={roomCode}
                    onChangeText={text => { setRoomCode(text) }}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={() => { navigation.navigate("RoomScreen") }}
                    style={styles.button}
                >
                    <Text>Join Room</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("ScanQrCodeScreen") }}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text>Scan QR-Code</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default VisitedRoomsScreen

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
