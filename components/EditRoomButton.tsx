import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Room } from '../types';

type EditRoomButtonProps = {
    roomProps: Room;
}


const EditRoomButton = ({ roomProps }: EditRoomButtonProps) => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <TouchableOpacity>
            <Icon
                name="edit"
                size={25}
                color="black"
                onPress={() => { navigation.navigate("EditRoom", { roomProps: roomProps }) }}
            />
        </TouchableOpacity>
    )
}

export default EditRoomButton

const styles = StyleSheet.create({})