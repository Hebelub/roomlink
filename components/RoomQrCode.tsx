import QrCode from 'react-native-qrcode-svg';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  code: string;
}

const RoomQrCode = ({ code }: Props) => {
  return (
    <QrCode value={'https://www.roomlink.com/' + code} size={220} />
  )
}

export default RoomQrCode

const styles = StyleSheet.create({})