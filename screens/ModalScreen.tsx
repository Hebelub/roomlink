import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist';
import useUsers from '../hooks/useUsers';
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomStackParamList } from '../navigator/RoomNavigator';

export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;


const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const {
        params: { name, userId },
    } = useRoute<ModalScreenRouteProp>();

    return (
        <View>
            <View>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon
                        name='closecircle'
                        type='antdesign'
                    />
                </TouchableOpacity>
            </View>

            <View>
                <View>
                    <Text>{name}</Text>
                </View>
            </View>
        </View>
    )
}

export default ModalScreen