import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist';
import useUsers from '../hooks/useUsers';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';

export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "Register">
>;



const RegisterScreen = () => {
    return (
        <View>
            <Text>RegisterScreen</Text>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})