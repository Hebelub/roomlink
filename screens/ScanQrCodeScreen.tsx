import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Icon } from '@rneui/themed';
import { Image } from '@rneui/themed';
import AccountButton from '../components/AccountButton';


const ScanQrCodeScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<AccountButton />),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Scan with the camera. It will join the room that you scan</Text>

            <Text>This should be a QR-Code camera scanner</Text>

            <Image
                source={{ uri: "https://ponderwall.com/wp-content/uploads/2022/05/Qrcode.png" }}
                style={{ width: 400, height: 400 }}
            />
        </View>
    )
}

export default ScanQrCodeScreen