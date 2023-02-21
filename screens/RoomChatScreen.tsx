import { SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';

const RoomChatScreen = () => {

    const tw = useTailwind();

    return (
        <SafeAreaView>
            <Text style={tw('text-red-500')}>RoomChatScreen</Text>
        </SafeAreaView>
    )
}

export default RoomChatScreen