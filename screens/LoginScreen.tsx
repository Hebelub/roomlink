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
                    source={require('../assets/fire.png')}
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
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Register") }}
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
        borderRadius: 5,
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
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f5fcff',
    },

    image: {
        width: 400,
        height: 400,
        borderRadius: 100,
        //borderWidth: 2,
        //borderColor: '#4caf50',
    },
});

export default LoginScreen;