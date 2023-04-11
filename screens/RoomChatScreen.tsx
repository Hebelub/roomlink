import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import VisitorCard from '../components/VisitorCard';
import ChatMessage from '../components/ChatMessage';
import EditRoomButton from '../components/EditRoomButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { auth } from '../firebase';


type RoomChatRouteProp = RouteProp<RootStackParamList, "RoomScreen">;

const RoomChatScreen = () => {
    const {
        params: { roomProps },
    } = useRoute<RoomChatRouteProp>();

    const tw = useTailwind();

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();
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

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (isOwner && <EditRoomButton />),
        });
    }, [navigation]);

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