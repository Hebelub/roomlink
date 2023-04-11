import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Icon } from '@rneui/themed';

const EditRoomButton = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <TouchableOpacity>
            <Icon
                name="edit"
                type="entypo"
                color="black"
                onPress={() => { navigation.navigate("ProfileScreen") }}
            />
        </TouchableOpacity>
    )
}

export default EditRoomButton

const styles = StyleSheet.create({})