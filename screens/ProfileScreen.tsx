import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import LoginScreen from './LoginScreen';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const tw = useTailwind();
    const navigation = useNavigation<any>();
    const { user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>

            {/* User info */}
            <View style={tw('flex flex-row items-center')}>
                <View style={tw('flex flex-col')}>
                    <Text>User Information</Text>
                    <Text style={tw('text-2xl font-bold')}>{user?.name}</Text>
                    <Text style={tw('text-gray-500')}>{user?.email}</Text>
                </View>
            </View>

            {/* Log out button */}
            <TouchableOpacity
                onPress={() => { navigation.navigate("LoginScreen") }}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text>Log Out</Text>
            </TouchableOpacity>

            {/* Your rooms */}
            <View style={tw('flex flex-row items-center')}>
                <View style={tw('flex flex-col')}>
                    <Text>Your Rooms</Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("RoomScreen") }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text>Room 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("RoomScreen") }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text>Room 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("RoomScreen") }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text>Room 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("RoomScreen") }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text>Room 4</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => { navigation.navigate("CreateRoomScreen") }}
                style={styles.button}
            >
                <Text>Create a new Room</Text>
            </TouchableOpacity>




        </SafeAreaView>
    )
}

export default ProfileScreen

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
