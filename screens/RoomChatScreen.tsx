import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import UserCard from '../components/UserCard';
import ChatMessage from '../components/ChatMessage';

const RoomChatScreen = () => {

    const tw = useTailwind();

    // const navigation = useNavigation<UserScreenNavigationProp>();
    const [input, setInput] = useState<string>("");

    // For now we will use a dummy data
    // But it should be fetched from the database
    const messages = [
        {
            postedBy: "John Doe",
            postTime: new Date(),
            text: "Hello. Where are you?"
        },
        {
            postedBy: "Mark Robinson",
            postTime: new Date(),
            text: "I am at the office right now. Did you want to meet?"
        },
    ];

    return (
        <SafeAreaView>
            <Text style={tw('text-red-500')}>RoomChatScreen</Text>

            {/* <ScrollView style={{ backgroundColor: "#06cf85" }}>
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
                    .map(({ name: ID, value: { email, name } }: MessageResponse) => (
                        <UserCard
                            key={ID}
                            email={email}
                            name={name}
                            userId={ID}
                        />
                    ))}
            </ScrollView> */}

            <FlatList
                data={messages}
                renderItem={({ item }) =>
                    <ChatMessage
                        postedBy={item.postedBy}
                        postTime={item.postTime}
                        text={item.text}
                    />
                }
            />
        </SafeAreaView>
    )
}

export default RoomChatScreen