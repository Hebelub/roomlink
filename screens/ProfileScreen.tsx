import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import VisitListItem, { VisitListItemProps } from '../components/VisitListItem';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Room } from '../types';
import { query, addDoc, collection, doc, setDoc, getDoc, where, getDocs, DocumentData, orderBy, limit } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";


const getRoomVisitTime = async (roomId: string): Promise<Date | null> => {
    const q = query(collection(db, "visits"),
        where('visitedRoom', '==', roomId),
        limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return doc.data().lastVisit.toDate();
};

const getUserVisits = async (userId: string): Promise<VisitListItemProps[]> => {
    const q = query(collection(db, "rooms"),
        where("createdById", "==", userId),
    );
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const room = doc.data() as Room;
        const lastVisit = await getRoomVisitTime(room.code);

        return {
            roomProps: room,
            lastVisit: lastVisit as (Date | null),
        };
    });

    const results = await Promise.all(promises);
    // Order the results by lastVisit in descending order
    return results.sort((a, b) => {
        if (!a.lastVisit && !b.lastVisit) {
            return 0;
        }
        if (!a.lastVisit) {
            return 1;
        }
        if (!b.lastVisit) {
            return -1;
        }
        return b.lastVisit.getTime() - a.lastVisit.getTime();
    });
};

const ProfileScreen = () => {

    const [userVisits, setUserVisits] = useState<VisitListItemProps[]>([]);
    const navigation = useNavigation<RootStackNavigationProp>();
    const user = auth.currentUser;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserVisits(user?.uid ?? "NO ID")
                .then((r) => {
                    setUserVisits(r);
                });
        });

        return unsubscribe;
    }, [navigation]);

    const signOut_ = () => {
        signOut(auth);
        navigation.replace("Login");
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* User info */}
            <Text style={styles.header}>User Information</Text>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>

            {/* Sign out button */}
            <TouchableOpacity
                onPress={() => { signOut_(); }}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text>Sign Out</Text>
            </TouchableOpacity>

            <View style={styles.spacing} />

            {/* Your rooms */}
            <Text style={styles.header}>Your Rooms</Text>

            {/* List of rooms */}
            <ScrollView>
                {userVisits.map((room: VisitListItemProps, index: number) => {
                    return (
                        <VisitListItem
                            key={index}
                            roomProps={room.roomProps}
                            lastVisit={room.lastVisit}
                        />
                    )
                })}
            </ScrollView>

            <View style={styles.spacing} />

            <TouchableOpacity
                onPress={() => { navigation.navigate("CreateRoom") }}
                style={styles.button}
            >
                <Text>Create Room</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    spacing: {
        height: 50,
    }
})
