import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import UserCard from '../components/UserCard';

export type UserScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Users'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const RoomUsersScreen = () => {

    const tw = useTailwind();
    const navigation = useNavigation<UserScreenNavigationProp>();
    const [input, setInput] = useState<string>("");
    const { loading, error, data } = useQuery(GET_USERS);

    console.log("YEE:", data);

    return (
        <ScrollView style={{ backgroundColor: "#06cf85" }}>
            <Text>DEBUG TEXT</Text>
            {data?.getUsers.map(({ name: ID, value: { email, name } }: UserResponse) => (
                <UserCard
                    key={ID}
                    email={email}
                    name={name}
                    userId={ID}
                />
            ))}
        </ScrollView>
    );
};

export default RoomUsersScreen
