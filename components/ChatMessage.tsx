import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CustomerScreenNavigationProp } from '../screens/RoomItemScreen';
import { useNavigation } from '@react-navigation/native'

type Props = {
    postedBy: string;
    postTime: Date;
    text: string;
}

const ChatMessage = (props: Props) => {

    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <View>
            <Text>{props.text}</Text>
            <Text>{props.postedBy}</Text>
            <Text>{props.postTime.toDateString()}</Text>
        </View>
    )
}

export default ChatMessage