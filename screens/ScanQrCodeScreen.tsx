import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { Button, Icon } from '@rneui/themed';
import { Image } from '@rneui/themed';
import AccountButton from '../components/AccountButton';
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getRoom } from './utils/utils';

const ScanQrCodeScreen = () => {

    const navigation = useNavigation<RootStackNavigationProp>();

    const [loading, setLoading] = useState<boolean>(true);
    const [scanData, setScanData] = useState<string | undefined>('');
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    const joinRoom = () => {
        const roomCode = scanData ? scanData.slice(-6) : "";

        getRoom(roomCode).then((room) => {
            if (room) {
                navigation.replace("Room", { roomProps: room })
            } else {
                alert("Room does not exist");
            }
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<AccountButton />),
        });
    }, [navigation]);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const { status, granted } = await BarCodeScanner.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        } catch (error) {
            console.log(error);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Requesting Permission ...</Text>
            </View>
        );
    };

    if (scanData) {
        joinRoom();

        return (
            <View style={styles.container}>
                <Text>{scanData}</Text>
                <Button title='Scan Again' onPress={() => setScanData(undefined)} />
            </View>
        );
    }

    if (hasPermission) {
        return <BarCodeScanner
            onBarCodeScanned={({ type, data }) => {
                try {
                    console.log(type);
                    console.log(data);
                    let _data = JSON.parse(data);
                    setScanData(_data);
                } catch (error) {
                    console.log("Unable to parse: ", error);
                    setScanData(data);
                }
            }}
            style={styles.container}
        />
    }

    return (
        <View style={styles.container}><Text>Enable Camera Permissions</Text></View>
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
    text: {
        backgroundColor: 'black',
        color: 'white',
    }
});

export default ScanQrCodeScreen