import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomStackParamList } from '../navigator/RoomNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import VisitorCard, { VisitorCardProps } from '../components/VisitorCard';
import { Input } from '@rneui/themed';
import { collection, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Room, Visit } from '../types';
import { VisitListItemProps } from '../components/VisitListItem';
import { User } from 'firebase/auth';
import EditRoomButton from '../components/EditRoomButton';


export type VisitorsScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList, 'Visitors'>,
    NativeStackNavigationProp<RootStackParamList>
>;

type VisitorsScreenRouteProp = RouteProp<RootStackParamList, "Room">;


const getVisitorCardPropsFromRoom = async (roomId: string): Promise<VisitorCardProps[]> => {
    const q = query(collection(db, "visits"), where("visitedRoom", "==", roomId));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const lastVisit = doc.data().lastVisit.toDate();
        const visit = doc.data() as Visit
        const u = { uid: visit.visitedBy };

        return {
            userId: u.uid,
            lastVisit: lastVisit,
        };
    });

    return await Promise.all(promises);
};


const RoomVisitorsScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<VisitorsScreenRouteProp>();

    const navigation = useNavigation<VisitorsScreenNavigationProp>();
    const [input, setInput] = useState<string>("");

    const [visitors, setVisitors] = useState<VisitorCardProps[]>([]);

    useEffect(() => {
        getVisitorCardPropsFromRoom(roomProps.code)
            .then((r) => {
                setVisitors(r);
            });
    }, []);

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (isOwner &&
                isOwner && <EditRoomButton roomProps={roomProps} />
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={{ backgroundColor: "#06cf85" }}>
            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                style={styles.input}
            />

            {/* List of rooms */}
            {<View>
                {visitors.map((v: VisitorCardProps, index: number) => {
                    return (
                        <VisitorCard
                            key={index}
                            userId={v.userId}
                            lastVisit={v.lastVisit}
                        />
                    );
                })}
            </View>}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        backgroundColor: "white",
    },
});

export default RoomVisitorsScreen
