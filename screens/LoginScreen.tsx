import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigator/RootNavigator';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = () => {

    const navigation = useNavigation<RootStackNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser: any) => {
            if (authUser) {
                navigation.replace("Home");
            }
        })

        return unsubscribe;
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                const user = userCredential.user;
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/RooMLinK.png')}
                    style={styles.image}
                />
            </View>

            <View>
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
                    <Text style={[styles.login]}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Register") }}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={[styles.register]}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 100 }}></View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 22,
        backgroundColor: 'white',
        height: 50,
        width: 300,
        margin: 10,
        // borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        fontSize: 44,
        backgroundColor: 'lightgreen',
        padding: 15,
        width: 300,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        fontSize: 22,
        backgroundColor: 'orange',
        // borderWidth: 1,
        marginTop: 10,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5fcff',
    },
    image: {
        marginLeft: 0,
        marginTop: 20,
        width: 400,
        height: 400,
        borderRadius: 100,
    },
    register: {
        fontSize: 18,
        fontFamily: 'Arial',
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
    login: {
        fontSize: 18,
        fontFamily: 'Arial',
        color: '#333',
        marginTop: 0,
        marginBottom: 10,
    },
});

export default LoginScreen;