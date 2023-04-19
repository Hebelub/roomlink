import { Text, View } from 'react-native'
import React, { Component, useEffect, useLayoutEffect } from 'react'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomVisitorsScreen from '../screens/RoomVisitorsScreen';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import { Room, Visit } from '../types';
import AccountButton from '../components/AccountButton';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import RoomInfoScreen from '../screens/RoomInfoScreen';


export type RoomStackParamList = {
    Chat: { roomProps: Room };
    Visitors: { roomProps: Room };
    Info: { roomProps: Room };
}

export type RoomNavigatorScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "Room">
>;

export type RoomNavigatorRouteProp = RouteProp<RootStackParamList, "Room">;

const Tab = createBottomTabNavigator<RoomStackParamList>();

const createVisit = async (roomCode: string, userId: any) => {

    try {
        const visit: Visit = {
            visitedRoom: roomCode,
            visitedBy: userId,
            lastVisit: new Date(),
        }

        await setDoc(doc(db, "visits", roomCode + userId), visit);

    } catch (e) {
        console.error("Error setting document: ", e);
    }
}

const RoomNavigator = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

    const user = auth.currentUser;

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            createVisit(roomProps.code, auth.currentUser?.uid ?? "NO ID");
        });

        return unsubscribe;
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: roomProps.name,
            headerRight: () => (<AccountButton />),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Chat') {
                        return (
                            <Icon
                                name="chat"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                    else if (route.name === 'Visitors') {
                        return (
                            <Icon
                                name="users"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                    else if (route.name === 'Info') {
                        return (
                            <Icon
                                name="info"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                }
            })}>

            <Tab.Screen name="Info" component={RoomInfoScreen} initialParams={{ roomProps: roomProps }} />
            <Tab.Screen name="Chat" component={RoomChatScreen} initialParams={{ roomProps: roomProps }} />
            <Tab.Screen name="Visitors" component={RoomVisitorsScreen} initialParams={{ roomProps: roomProps }} />
        </Tab.Navigator >
    )
}

export default RoomNavigator