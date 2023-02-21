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
import { Input } from '@rneui/themed';

export type UserScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Users'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const RoomUsersScreen = () => {

    const tw = useTailwind();
    const navigation = useNavigation<UserScreenNavigationProp>();
    const [input, setInput] = useState<string>("");
    const { loading, error, data } = useQuery(GET_USERS);

    return (
        <ScrollView style={{ backgroundColor: "#06cf85" }}>
            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />
            {data?.getUsers
                ?.filter((user: UserList) =>
                    user.value.name.includes(input)
                )
                .map(({ name: ID, value: { email, name } }: UserResponse) => (
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
