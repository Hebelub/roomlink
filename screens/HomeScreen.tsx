import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Room, Visit } from '../types';
import AccountButton from '../components/AccountButton';
import { Icon } from '@rneui/themed';
import VisitListItem, { VisitListItemProps } from '../components/VisitListItem';
import { getRoom } from '../utils/utils';
import { onAuthStateChanged } from 'firebase/auth';


const getUserVisits = async (userId: string): Promise<VisitListItemProps[]> => {
    const q = query(collection(db, "visits"), where("visitedBy", "==", userId));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const room = await getRoom(doc.data().visitedRoom);

        return {
            roomProps: room as Room,
            lastVisit: doc.data().lastVisit.toDate(),
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

const HomeScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [userVisits, setUserVisits] = useState<VisitListItemProps[]>([]);
    const [roomCode, setRoomCode] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<AccountButton />),
        });
    }, [navigation]);

    useEffect(() => {
        const fetchUserVisits = async () => {
            const visits = await getUserVisits(auth.currentUser?.uid ?? "NO ID");
            setUserVisits(visits);
        };

        const unsubscribe = onAuthStateChanged(auth, (authUser: any) => {
            if (authUser) {
                fetchUserVisits();
            }
        })

        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserVisits(auth.currentUser?.uid ?? "NO ID")
                .then((r) => {
                    setUserVisits(r);
                });
        });

        return unsubscribe;
    }, [navigation]);

    const joinRoom = () => {

        getRoom(roomCode).then((room) => {
            if (room) {
                navigation.navigate("Room", { roomProps: room })
            } else {
                alert("Room does not exist");
            }
        });
    };

    return (
        <SafeAreaView style={styles.Bcontainer}>


            <View style={styles.container}>
                <Text style={styles.header}>Join Room</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter room code"
                        value={roomCode}
                        onChangeText={text => setRoomCode(text)}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={() => joinRoom()}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Icon
                            name="controller-play"
                            type="entypo"
                            size={24}
                            color="#FFF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("ScanQrCode")}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Icon
                            name="qr-code-scanner"
                            type="materialIcons"
                            size={24}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.headerV}>Visited Rooms</Text>

            {/* List of rooms */}
            {<ScrollView  >

                {userVisits.map((visit: VisitListItemProps, index: number) => {
                    return (
                        <VisitListItem
                            key={index}
                            roomProps={visit.roomProps}
                            lastVisit={visit.lastVisit}
                        />
                    );
                })}
            </ScrollView>}


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    Bcontainer: {
        backgroundColor: 'lightgreen',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    headerV: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 30,
        fontWeight: '100',
        textAlign: 'center',
        padding: 1,

        paddingTop: 80,
        marginBottom: 20,
        color: '#333'
    },
    header: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 50,
        fontWeight: '100',
        textAlign: 'center',
        padding: 1,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '60%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        fontSize: 23,

    },
    button: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    buttonOutline: {
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#333',
        marginLeft: 10
    }
});


export default HomeScreen;
