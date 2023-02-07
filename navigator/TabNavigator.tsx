import { Text, View } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomItemScreen from '../screens/RoomItemScreen';
import RoomUsersScreen from '../screens/RoomUsersScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
    Profile: undefined;
    Chat: undefined;
    Items: undefined;
    Users: undefined;
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {

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
                }
            })}>
            {/* The ProfileScreen should be located another place */}
            <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>

            <Tab.Screen name="Chat" component={RoomChatScreen}></Tab.Screen>
            <Tab.Screen name="Items" component={RoomItemScreen}></Tab.Screen>
            <Tab.Screen name="Users" component={RoomUsersScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator