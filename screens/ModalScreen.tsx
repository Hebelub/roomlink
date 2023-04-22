import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomStackParamList } from '../navigator/RoomNavigator';
import useUser from '../hooks/useUser';

export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;


const ModalScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const {
        params: { userId },
    } = useRoute<ModalScreenRouteProp>();

    const user = useUser(userId);

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
                    <Text>{user?.displayName}</Text>
                </View>
            </View>
        </View>
    )
}

export default ModalScreen