import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Icon } from '@rneui/themed';

const AccountButton = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <Icon
            name="user"
            type="entypo"
            color="tomato"
            onPress={() => { navigation.navigate("ProfileScreen") }}
        />
    )
}

export default AccountButton

const styles = StyleSheet.create({})