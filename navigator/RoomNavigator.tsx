import { Text, View } from 'react-native'
import React, { Component, useEffect, useLayoutEffect } from 'react'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomItemScreen from '../screens/RoomItemScreen';
import RoomVisitorsScreen from '../screens/RoomVisitorsScreen';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import RoomProfileScreen from '../screens/RoomProfileScreen';
import RoomInfoScreen from '../screens/RoomInfoScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import { Room, Visit } from '../types';
import AccountButton from '../components/AccountButton';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


export type RoomStackParamList = {
    Chat: undefined;
    Visitors: { roomProps: Room };
    Info: { roomProps: Room };
}

export type RoomNavigatorScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "RoomScreen">
>;

type RoomNavigatorRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

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

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Create or update visit whenever the room is entered

            createVisit(roomProps.code, "the_user_id");
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
            {/* The ProfileScreen should be located another place */}
            <Tab.Screen name="Info" component={RoomInfoScreen} initialParams={{ roomProps: roomProps }} />
            <Tab.Screen name="Chat" component={RoomChatScreen} />
            <Tab.Screen name="Visitors" component={RoomVisitorsScreen} initialParams={{ roomProps: roomProps }} />
        </Tab.Navigator >
    )
}

export default RoomNavigator