import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import VisitorCard from '../components/VisitorCard';
import ChatMessage from '../components/ChatMessage';

const RoomChatScreen = () => {

    const tw = useTailwind();

    // const navigation = useNavigation<UserScreenNavigationProp>();
    const [input, setInput] = useState<string>("");

    // For now we will use a dummy data
    // But it should be fetched from the database
    const messages = [
        {
            text: "Hello. Where are you?",
            createdAt: new Date(),
            createdBy: "John Doe",
        },
        {
            text: "I am at the office right now. Did you want to meet?",
            createdAt: new Date(),
            createdBy: "Mark Robinson",
        },
    ];

    return (
        <SafeAreaView>
            <Text style={tw('text-red-500')}>RoomChatScreen</Text>

            <FlatList
                data={messages}
                renderItem={({ item }) =>
                    <ChatMessage
                        createdBy={item.createdBy}
                        createdAt={item.createdAt}
                        text={item.text}
                    />
                }
            />
        </SafeAreaView>
    )
}

export default RoomChatScreen