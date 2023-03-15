import { View, Text } from 'react-native'
import React from 'react'

const ScanQrCodeScreen = () => {
    // Should contain:
    // 1. Camera view
    // It should join the corresponding room when it scans a QR-code

    return (
        <View>
            <Text>Scan with the camera. It will join the room that you scan</Text>

            <Text>This should be a QR-Code camera scanner</Text>
        </View>
    )
}

export default ScanQrCodeScreen