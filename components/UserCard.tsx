import { View, Text } from 'react-native'
import React from 'react'
import useRooms from '../hooks/useRooms';
import { useTailwind } from 'tailwind-rn/dist';
import { CustomerScreenNavigationProp } from '../screens/RoomItemScreen';
import { useNavigation } from '@react-navigation/native';

type Props = {
    userId: string;
    name: string;
    email: string;
}

const UserCard = (props: Props) => {

    const { loading, error, rooms } = useRooms();
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <View>
            <Text>UserCard</Text>
        </View>
    )
}

export default UserCard