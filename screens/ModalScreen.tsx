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
                <View>
                    <Text>{user?.displayName}</Text>

                    {user?.photoURL && <Image
                        style={styles.avatar}
                        source={{ uri: user?.photoURL }}
                    />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 400,
        width: 400,
        borderRadius: 9999,
    },
});

export default ModalScreen