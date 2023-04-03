import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import LoginScreen from './LoginScreen';
import { useNavigation } from '@react-navigation/native';
import VisitListItem from '../components/VisitListItem';

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
                    <VisitListItem roomProps={{ roomName: 'My First Room', roomCode: "123427" }} />
                    <VisitListItem roomProps={{ roomName: 'Best Room', roomCode: "452986" }} />
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
