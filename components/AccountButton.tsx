import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../firebase';
import useUser from '../hooks/useUser';
import UserAvatar from './UserAvatar';


const AccountButton = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    const user = useUser();

    return (
        <View style={styles.container}>
            {
                user ?
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
                        <UserAvatar
                            photoURL={user?.photoURL}
                            size={40}
                        />
                    </TouchableOpacity> :
                    <TouchableOpacity>
                        <Icon
                            size={34}
                            name="login"
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
    displayName: {
        fontSize: 40,
        paddingRight: 20,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    }
})