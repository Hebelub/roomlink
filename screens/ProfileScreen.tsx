import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import VisitListItem, { VisitListItemProps } from '../components/VisitListItem';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Room } from '../types';
import { query, addDoc, collection, doc, setDoc, getDoc, where, getDocs, DocumentData, orderBy, limit } from 'firebase/firestore';
import { User, signOut, updateProfile } from "firebase/auth";
import { db, auth } from "../firebase";
import { setUserInDb } from '../hooks/useUser';


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
    
    const [isInEditMode, setIsInEditMode] = useState(false);

    const [userVisits, setUserVisits] = useState<VisitListItemProps[]>([]);
    const navigation = useNavigation<RootStackNavigationProp>();
    const user = auth.currentUser;

    // If editing user info
    const [displayName, setName] = useState(user?.displayName ?? "");
    const [imageUrl, setImageUrl] = useState(user?.photoURL ?? "");

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

    const editUserInformation = () => {
        setIsInEditMode(true);
    }

    const saveUserInformation = async () => {
        
        if (displayName.trim() === "") 
       { alert ("Update room name!")
         return;
       }
        setIsInEditMode(false);

        setUserInDb({
            uid: user?.uid ?? "",
            displayName: displayName,
            email: user?.email ?? "",
            photoURL: imageUrl,
        } as User);

        user && updateProfile(user, {
            displayName: displayName,
            photoURL:
                imageUrl ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",

        })
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* User info */}
            <Text style={styles.header}>{displayName}</Text>

            {isInEditMode ? (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={displayName}
                        onChangeText={(text) => setName(text)}
                    />

                    <Text>{user?.email}</Text>

                    {user?.photoURL && <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: user?.photoURL }}
                    />}

                    <TextInput
                        style={styles.input}
                        placeholder="Profile Image URL (optional)"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        onSubmitEditing={saveUserInformation}
                    />

                    {/* Edit User Information */}
                    <TouchableOpacity
                        onPress={() => { saveUserInformation(); }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text>{user?.email}</Text>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: imageUrl }}
                    />

                    <View style={[styles.container, { display: 'flex' }]}>
                        {/* Sign out button */}
                        <TouchableOpacity
                            onPress={() => { signOut_(); }}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text>Sign Out</Text>
                        </TouchableOpacity>

                        {/* Edit User Information */}
                        <TouchableOpacity
                            onPress={() => { editUserInformation(); }}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text>Edit user info</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

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
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
})
