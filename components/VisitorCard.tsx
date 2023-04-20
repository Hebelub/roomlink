import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';

export type VisitorCardProps = {
    userId: string;
    name: string;
    imageUrl: string;
    lastVisit: Date;
}

export const VisitorCard = ({ imageUrl, name, userId }: VisitorCardProps) => {

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MyModal', {
                    name: name,
                    userId: userId,
                })
            }
        >
            <Card>
                <View>
                    <View>
                        <Text>
                            {name}
                        </Text>
                        <Text>
                            ID: {userId}
                        </Text>
                    </View>

                    <View>
                        {/* <Text>{loading ? "Loading ..." : `${users.length} x`}</Text> */}
                        <Icon
                            name='user'
                            type='entypo'
                            color='tomato'
                            size={200}
                        />
                    </View>
                </View>
                <Card.Divider />
            </Card>

        </TouchableOpacity>
    )
}

export default VisitorCard