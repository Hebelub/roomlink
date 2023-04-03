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

type RoomProps = {
    roomName: string;
};

export type TabStackParamList = {
    RoomProfile: { props: RoomProps };
    Chat: { props: RoomProps };
    Items: { props: RoomProps };
    Users: { props: RoomProps };
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = ({ route }: any) => {

    const navigation = useNavigation<any>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.roomName,
            headerRight: () => (
                <Icon
                    name="user"
                    type="entypo"
                    color="tomato"
                    onPress={() => { navigation.navigate("ProfileScreen") }
                    }
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
                    if (route.name === 'RoomProfile') {
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
            <Tab.Screen name="RoomProfile" component={RoomProfileScreen}></Tab.Screen>
            <Tab.Screen name="Chat" component={RoomChatScreen}></Tab.Screen>
            <Tab.Screen name="Items" component={RoomItemScreen}></Tab.Screen>
            <Tab.Screen name="Users" component={RoomUsersScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator