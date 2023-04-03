import { Text, View } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomItemScreen from '../screens/RoomItemScreen';
import RoomUsersScreen from '../screens/RoomUsersScreen';
import LoginScreen from '../screens/LoginScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import RoomProfileScreen from '../screens/RoomProfileScreen';
import RoomInfoScreen from '../screens/RoomInfoScreen';

export type RoomProps = {
    roomName: string;
    roomCode: string;
};

export type TabStackParamList = {
    navigate(arg0: string): unknown;
    setOptions(arg0: { headerTitle: any; headerRight: () => JSX.Element; }): unknown;
    Profile: undefined;
    Chat: undefined;
    Items: undefined;
    Users: undefined;
    Info: { roomProps: RoomProps };
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = ({ route }: any) => {

    const navigation = useNavigation<TabStackParamList>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.roomProps.roomName,
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
            <Tab.Screen name="Profile" component={RoomProfileScreen} />
            <Tab.Screen name="Chat" component={RoomChatScreen} />
            <Tab.Screen name="Items" component={RoomItemScreen} />
            <Tab.Screen name="Users" component={RoomUsersScreen} />
        </Tab.Navigator >
    )
}

export default TabNavigator