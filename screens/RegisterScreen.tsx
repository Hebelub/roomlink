import {
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParamList } from "../navigator/RootNavigator";
import { RoomStackParamList } from "../navigator/RoomNavigator";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "@rneui/base";
import { db, auth } from "../firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { setUserInDb } from "../hooks/useUser";
import { checkURL } from "../utils/utils";

export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RoomStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "Register">
>;

const RegisterScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser: any) => {
            if (authUser) {
                navigation.replace("Home");
            }
        })

        return unsubscribe;
    }, [])


    const register = async (): Promise<void> => {

        if (name.trim() === "") {
            alert("Fill in name!")
            return;
        }

        const isValidImageURL = imageUrl.trim() === "" || await checkURL(imageUrl);

        if (!isValidImageURL) {
            alert("Invalid image URL!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser: any) => {
                const user = authUser.user;

                setUserInDb({
                    uid: user?.uid ?? "",
                    displayName: name,
                    email: user?.email ?? "",
                    photoURL: imageUrl,
                } as User);

                return updateProfile(user, {
                    displayName: name,
                    photoURL: imageUrl,
                });

            })
            .catch((error: any) => alert(error.message));
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <Text style={styles.title}>Create a Roomlink account</Text>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Profile Image URL (optional)"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        onSubmitEditing={register}
                    />
                    <TouchableOpacity style={styles.button} onPress={register}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 50,
    },
    form: {
        width: "100%",
        maxWidth: 350,
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});
