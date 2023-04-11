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
import EditRoomScreen from '../screens/EditRoomScreen';


export type RootStackParamList = {
    Room: { roomProps: Room };
    MyModal: { userId: string; name: string };
    Register: undefined;
    CreateRoom: undefined;
    EditRoom: { roomProps: Room };
    Profile: undefined;
    ScanQrCode: undefined;
    Home: undefined;
    Login: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    return (
        <RootStack.Navigator>

            <RootStack.Group>
                <RootStack.Screen name="Home" component={HomeScreen} />
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen name="CreateRoom" component={CreateRoomScreen} />
                <RootStack.Screen name="Profile" component={ProfileScreen} />
                <RootStack.Screen name="ScanQrCode" component={ScanQrCodeScreen} />
                <RootStack.Screen name="EditRoom" component={EditRoomScreen} />
            </RootStack.Group>

            <RootStack.Group>
                <RootStack.Screen
                    name="Room"
                    component={RoomNavigator}
                />
            </RootStack.Group>

            <RootStack.Group
                screenOptions={{
                    presentation: "modal",
                }}
            >
                <RootStack.Screen name="MyModal" component={ModalScreen} />

            </RootStack.Group>

        </RootStack.Navigator>
    )
}

export default RootNavigator