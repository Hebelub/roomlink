import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import VisitListItem, { VisitListItemProps } from '../components/VisitListItem';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Room } from '../types';
import { query, addDoc, collection, doc, setDoc, getDoc, where, getDocs, DocumentData, orderBy, limit } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";


const getLastVisit = async (roomId: string): Promise<Room | null> => {
    const q = query(collection(db, "visits"),
        where('visitedRoom', '==', roomId),
        orderBy('lastVisit', 'desc'),
        limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        console.log("What", snapshot)
        return null;
    }
    const doc = snapshot.docs[0];
    return doc.data().lastVisit.toDate();
};

const getUserVisits = async (userId: string): Promise<VisitListItemProps[]> => {
    const q = query(collection(db, "rooms"), where("createdById", "==", userId));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const room = doc.data() as Room;
        const lastVisit = await getLastVisit(room.code);

        return {
            roomProps: room,
            lastVisit: lastVisit as (Date | null),
        };
    });

    return await Promise.all(promises);
};

const ProfileScreen = () => {

    const [userVisits, setUserVisits] = useState<VisitListItemProps[]>([]);

    useEffect(() => {
        getUserVisits("the_user_id")
            .then((r) => {
                setUserVisits(r);
            });
    }, []);

    const navigation = useNavigation<RootStackNavigationProp>();
    const { user } = useAuth();

    const signOut_ = () => {
        signOut(auth);
        navigation.replace("LoginScreen");
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
                    <View>
                        {userVisits.map((room: VisitListItemProps, index: number) => {
                            return (
                                <VisitListItem
                                    key={index}
                                    roomProps={room.roomProps}
                                    lastVisit={room.lastVisit}
                                />
                            )
                        })}
                    </View>
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
