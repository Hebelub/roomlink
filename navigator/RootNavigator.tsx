import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
    Main: undefined;
    MyModal: { userId: string; name: string };
}

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="Room Name" component={TabNavigator} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootNavigator