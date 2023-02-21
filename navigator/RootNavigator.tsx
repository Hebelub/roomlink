import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';

export type RootStackParamList = {
    Main: undefined;
    MyModal: { userId: string; name: string };
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="Main" component={TabNavigator} />
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