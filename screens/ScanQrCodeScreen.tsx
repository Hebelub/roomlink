import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Icon } from '@rneui/themed';
import { Image } from '@rneui/themed';
import AccountButton from '../components/AccountButton';
import { StyleSheet } from 'react-native';


const ScanQrCodeScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<AccountButton />),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Scan Room With Camera</Text>

            <Image
                source={{ uri: "https://ponderwall.com/wp-content/uploads/2022/05/Qrcode.png" }}
                style={{ width: 400, height: 400 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
    },
});

export default ScanQrCodeScreen