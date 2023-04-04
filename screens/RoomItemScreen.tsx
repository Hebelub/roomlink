import { ScrollView, Text, View } from 'react-native'
import React, { Component, useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Image, Input } from '@rneui/themed';

const RoomItemScreen = () => {
    const tw = useTailwind();
    const [input, setInput] = useState<string>('');


    return (
        <ScrollView style={{ backgroundColor: "#59C1CC" }}>
            <Input
                placeholder="Search"
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />
        </ScrollView>
    )
}

export default RoomItemScreen