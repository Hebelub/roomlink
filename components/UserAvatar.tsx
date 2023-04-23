import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from "@rneui/themed";

type UserAvatarProps = {
    photoURL: string | null,
    size: number,
}

const UserAvatar = ({ photoURL, size }: UserAvatarProps) => {

    if (photoURL === "") {
        photoURL = null;
    }

    return (
        <Image
            style={{
                height: size,
                width: size,
                borderRadius: 9999,
            }}
            source={{
                uri: photoURL ??
                    "https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346796_TSg5VcYjsFxZtIDK6Qdctg3yqAapG7Xa.jpg"
            }}
        />
    )
}

export default UserAvatar
