import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import VisitListItem from '../components/VisitListItem';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Room } from '../types';
import { query, addDoc, collection, doc, setDoc, getDoc, where, getDocs, DocumentData } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";


const getUserRooms = async (userId: string): Promise<Room[]> => {
    const q = query(collection(db, "rooms"), where("createdById", "==", userId));
    const querySnapshot = await getDocs(q);
    const userRooms: Room[] = [];
    querySnapshot.forEach((doc) => {
        userRooms.push(doc.data() as Room);
    });
    return userRooms;
};

const ProfileScreen = () => {

    const [userRooms, setUserRooms] = useState<Room[]>([]);

    useEffect(() => {
        getUserRooms("the_user_id")
            .then((r) => {
                setUserRooms(r);
            });
    }, []);

    const tw = useTailwind();
    const navigation = useNavigation<RootStackNavigationProp>();
    const { user } = useAuth();

    const signOut_ = () => {
        signOut(auth);
        navigation.navigate("LoginScreen");
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* User info */}
            <View>
                <View>
                    <Text>User Information</Text>
                    <Text>{user?.name}</Text>
                    <Text>{user?.email}</Text>
                </View>
            </View>

            {/* Sign out button */}
            <TouchableOpacity
                onPress={() => { signOut_(); }}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text>Sign Out</Text>
            </TouchableOpacity>

            {/* Your rooms */}
            <View>
                <View>
                    <Text style={styles.header}>Your Rooms</Text>

                    {/* List of rooms */}
                    <>
                        {console.log(userRooms)}
                        <View>
                            {userRooms.map((room: Room) => {
                                return (
                                    <VisitListItem
                                        roomProps={room}
                                        lastVisit={null}
                                    />
                                )
                            })}
                        </View>
                    </>

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
    header: {
        fontSize: 30,
    }
})
