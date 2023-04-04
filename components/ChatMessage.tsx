import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native'
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { Message } from '../types';


const ChatMessage = (props: Message) => {

    const tw = useTailwind();
    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    return (
        <View>
            <Text>{props.text}</Text>
            <Text>{props.createdBy}</Text>
            <Text>{props.createdAt.toDateString()}</Text>
        </View>
    )
}

export default ChatMessage