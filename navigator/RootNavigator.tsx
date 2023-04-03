import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator, { TabStackParamList } from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VisitedRoomsScreen from '../screens/VisitedRoomsScreen';
import CreateRoomScreen from '../screens/CreateRoomScreen';
import ScanQrCodeScreen from '../screens/ScanQrCodeScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RoomProps } from './TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


export type RootStackParamList = {
    RoomScreen: { roomProps: RoomProps };
    MyModal: { userId: string; name: string };
    Register: undefined;
    CreateRoomScreen: undefined;
    ProfileScreen: undefined;
    ScanQrCodeScreen: undefined;
    VisitedRoomsScreen: undefined;
    LoginScreen: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type RoomScreenRouteProp = RouteProp<RootStackParamList, 'RoomScreen'>;

type Props = {
    route: RoomScreenRouteProp;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    return (
        <RootStack.Navigator>

            <RootStack.Group>
                <RootStack.Screen name="VisitedRoomsScreen" component={VisitedRoomsScreen} />
                <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
                <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
                <RootStack.Screen name="ScanQrCodeScreen" component={ScanQrCodeScreen} />
            </RootStack.Group>

            <RootStack.Group>
                <RootStack.Screen
                    name="RoomScreen"
                    component={TabNavigator}
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