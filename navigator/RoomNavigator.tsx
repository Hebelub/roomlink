import { Text, View } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomChatScreen from '../screens/RoomChatScreen';
import RoomItemScreen from '../screens/RoomItemScreen';
import RoomUsersScreen from '../screens/RoomUsersScreen';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import RoomProfileScreen from '../screens/RoomProfileScreen';
import RoomInfoScreen from '../screens/RoomInfoScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import { Room } from '../types';
import AccountButton from '../components/AccountButton';
import { Info, Accessibility, Chat, Category, Group } from '@mui/icons-material';


export type RoomStackParamList = {
    Profile: undefined;
    Chat: undefined;
    Items: undefined;
    Users: undefined;
    Info: { roomProps: Room };
}

export type RoomNavigatorScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "RoomScreen">
>;

type RoomNavigatorRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const Tab = createBottomTabNavigator<RoomStackParamList>();

const RoomNavigator = () => {

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

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
                    if (route.name === 'Profile') {
                        return (<Accessibility />);
                    }
                    else if (route.name === 'Chat') {
                        return (<Chat />);
                    }
                    else if (route.name === 'Items') {
                        return (<Category />);
                    }
                    else if (route.name === 'Users') {
                        return (<Group />);
                    }
                    else if (route.name === 'Info') {
                        return (<Info />);
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

export default RoomNavigator