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

            {
                user ?
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
                        {user?.photoURL && <Image
                            style={styles.avatar}
                            source={{ uri: user?.photoURL }}
                        />}
                    </TouchableOpacity> :
                    <TouchableOpacity>
                        <Icon
                            size={34}
                            name="login"
                            type="entypo"
                            color="lightred"
                            onPress={() => { navigation.navigate("Login") }}
                        />
                    </TouchableOpacity>
            }

        </View>
    )
}

export default AccountButton

const styles = StyleSheet.create({
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 9999,
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