import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Icon } from '@rneui/themed';
import { auth } from '../firebase';
import useUser from '../hooks/useUser';
import { Image } from "@rneui/themed";


const AccountButton = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    const user = useUser();

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.displayName}
            >{user?.displayName}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
                {user?.photoURL && <Image
                    style={styles.avatar}
                    source={{ uri: user?.photoURL }}
                />}
            </TouchableOpacity>
        </View>
    )
}

export default AccountButton

const styles = StyleSheet.create({
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 9999,
        padding: 12,
    },
    displayName: {
        fontSize: 40,
        paddingRight: 20,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
})