import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomStackParamList } from '../navigator/RoomNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import UserCard from '../components/UserCard';
import { Input } from '@rneui/themed';

export type UserScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList, 'Visitors'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const RoomVisitorsScreen = () => {

    const tw = useTailwind();
    const navigation = useNavigation<UserScreenNavigationProp>();
    const [input, setInput] = useState<string>("");

    return (
        <ScrollView style={{ backgroundColor: "#06cf85" }}>
            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />

        </ScrollView>
    );
};

export default RoomVisitorsScreen
