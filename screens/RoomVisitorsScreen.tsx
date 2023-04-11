import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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


export type VisitorsScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList, 'Visitors'>,
    NativeStackNavigationProp<RootStackParamList>
>;

type VisitorsScreenRouteProp = RouteProp<RootStackParamList, "RoomScreen">;


const getVisitorCardPropsFromRoom = async (roomId: string): Promise<VisitorCardProps[]> => {
    const q = query(collection(db, "visits"), where("visitedRoom", "==", roomId));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const visit = doc.data() as Visit;
        const u = { uid: "test_id", displayName: "test_name", photoURL: "test_photo" } as User;

        return {
            userId: u.uid,
            name: u.displayName ? u.displayName : "No name",
            imageUrl: u.photoURL ? u.photoURL : "https://www.gravatar.com/avatar/0",
            lastVisit: visit.lastVisit as Date,
        };
    });

    return await Promise.all(promises);
};


const RoomVisitorsScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<VisitorsScreenRouteProp>();

    const tw = useTailwind();
    const navigation = useNavigation<VisitorsScreenNavigationProp>();
    const [input, setInput] = useState<string>("");

    const [visitors, setVisitors] = useState<VisitorCardProps[]>([]);

    useEffect(() => {
        getVisitorCardPropsFromRoom(roomProps.code)
            .then((r) => {
                setVisitors(r);
            });
    }, []);

    return (
        <ScrollView style={{ backgroundColor: "#06cf85" }}>
            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />

            {/* List of rooms */}
            {<View>
                {visitors.map((v: VisitorCardProps, index: number) => {
                    return (
                        <VisitorCard
                            key={index}
                            userId={v.userId}
                            name={v.name}
                            imageUrl={v.imageUrl}
                            lastVisit={v.lastVisit}
                        />
                    );
                })}
            </View>}

        </ScrollView>
    );
};

export default RoomVisitorsScreen
function getUserVisits(arg0: string) {
    throw new Error('Function not implemented.');
}

