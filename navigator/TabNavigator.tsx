import { Text, View } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomItemScreen from '../screens/RoomItemScreen';
import RoomUsersScreen from '../screens/RoomUsersScreen';
import LoginScreen from '../screens/LoginScreen';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import RoomProfileScreen from '../screens/RoomProfileScreen';
import RoomInfoScreen from '../screens/RoomInfoScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';

export type RoomProps = {
    roomName: string;
    roomCode: string;
};

export type TabStackParamList = {
    Profile: undefined;
    Chat: undefined;
    Items: undefined;
    Users: undefined;
    Info: { roomProps: RoomProps };
}

export type TabNavigatorScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "RoomScreen">
>;

type TabNavigatorRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {

    const navigation = useNavigation<TabNavigatorScreenNavigationProp>();

    const {
        params: { roomProps },
    } = useRoute<TabNavigatorRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: roomProps.roomName,
            headerRight: () => (
                <Icon
                    name="user"
                    type="entypo"
                    color="tomato"
                    onPress={() => { navigation.navigate("ProfileScreen") }}
                />
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Profile') {
                        return (
                            <Icon
                                name="user"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                    else if (route.name === 'Chat') {
                        return (
                            <Icon
                                name="chat"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                    else if (route.name === 'Items') {
                        return (
                            <Icon
                                name="box"
                                type="entypo"
                                color={focused ? 'tomato' : 'gray'}
                            />
                        );
                    }
                    else if (route.name === 'Users') {
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
            <Tab.Screen name="Profile" component={RoomProfileScreen} />
            <Tab.Screen name="Chat" component={RoomChatScreen} />
            <Tab.Screen name="Items" component={RoomItemScreen} />
            <Tab.Screen name="Users" component={RoomUsersScreen} />
        </Tab.Navigator >
    )
}

export default TabNavigator