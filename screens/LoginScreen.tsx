import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from './RoomItemScreen';

const LoginScreen = () => {

    const { signInWithGoogle } = useAuth();

    const navigation = useNavigation<CustomerScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View>
                <Button title="login" onPress={signInWithGoogle}>
                    Sign in with Google
                </Button>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => { setEmail(text) }}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => { signIn() }}
                    style={styles.button}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Register", {}) }}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 100 }}></View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        width: 300,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginTop: 10,
    },
})

export default LoginScreen