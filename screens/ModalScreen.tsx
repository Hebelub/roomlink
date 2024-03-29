import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { RootStackParamList } from '../navigator/RootNavigator';
import { RoomStackParamList } from '../navigator/RoomNavigator';
import useUser from '../hooks/useUser';
import { Image } from "@rneui/themed";
import UserAvatar from '../components/UserAvatar';

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

            <View style={styles.container}>
                <Text style={styles.header}>{user?.displayName}</Text>

                <UserAvatar
                    photoURL={user?.photoURL}
                    size={200}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {

        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 30,
        fontWeight: '100',
        textAlign: 'center',
        padding: 1,
        color: '#333'
    },
})


export default ModalScreen