import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useRooms from '../hooks/useRooms';
import { useTailwind } from 'tailwind-rn/dist';
import { CustomerScreenNavigationProp } from '../screens/RoomItemScreen';
import { useNavigation } from '@react-navigation/native';
import useUsers from '../hooks/useUsers';
import { Card, Icon } from '@rneui/themed';

type Props = {
    postedBy: string;
    postTime: Date;
    text: string;
}

const ChatMessage = (props: Props) => {

    const { loading, error, users } = useUsers();
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