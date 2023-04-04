import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import RoomNavigator from './RoomNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateRoomScreen from '../screens/CreateRoomScreen';
import ScanQrCodeScreen from '../screens/ScanQrCodeScreen';
import LoginScreen from '../screens/LoginScreen';
import { Room } from '../types';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


export type RootStackParamList = {
    RoomScreen: { roomProps: Room };
    MyModal: { userId: string; name: string };
    Register: undefined;
    CreateRoomScreen: undefined;
    ProfileScreen: undefined;
    ScanQrCodeScreen: undefined;
    HomeScreen: undefined;
    LoginScreen: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    return (
        <RootStack.Navigator>

            <RootStack.Group>
                <RootStack.Screen name="HomeScreen" component={HomeScreen} />
                <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
                <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
                <RootStack.Screen name="ScanQrCodeScreen" component={ScanQrCodeScreen} />
            </RootStack.Group>

            <RootStack.Group>
                <RootStack.Screen
                    name="RoomScreen"
                    component={RoomNavigator}
                />
            </RootStack.Group>

            <RootStack.Group
                screenOptions={{
                    presentation: "modal",
                }}
            >
                <RootStack.Screen
                    name="MyModal"
                    component={ModalScreen}
                />
            </RootStack.Group>

        </RootStack.Navigator>
    )
}

export default RootNavigator