import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { RoomNavigatorRouteProp, RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { auth } from '../firebase';
import EditRoomButton from '../components/EditRoomButton';
import RoomQrCode from '../components/RoomQrCode';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";


const RoomRichTextScreen = () => {

    const {
        params: { roomProps },
    } = useRoute<RoomNavigatorRouteProp>();

    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                isOwner && <EditRoomButton roomProps={roomProps} />
            ),
        });
    }, [navigation]);

    const richText = useRef();

    return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <Text>Description:</Text>
                    <RichEditor
                        ref={richText}
                        onChange={descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
                iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
            />
        </SafeAreaView>
    )
}

export default RoomRichTextScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        fontSize: 80,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    spacing: {
        height: 20,
    }
})