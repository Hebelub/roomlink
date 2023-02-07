import { ScrollView, Text, View } from 'react-native'
import React, { Component, useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Input } from '@rneui/themed';


export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Items'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const RoomItemScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <ScrollView style={{ backgroundColor: "#59C1CC" }}>
            <Image
                source={{ uri: 'https://links.papareact.com/3jc' }}
                containerStyle={tw('w-full h-64')}
            />

            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />
        </ScrollView>

    )
}

export default RoomItemScreen