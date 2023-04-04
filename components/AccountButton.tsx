import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';

const AccountButton = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <AccountCircle
            onClick={() => { navigation.navigate("ProfileScreen") }}
        />
    )
}

export default AccountButton

const styles = StyleSheet.create({})