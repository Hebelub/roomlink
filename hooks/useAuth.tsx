import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as AuthSession from 'expo-auth-session';
import * as Google from "expo-google-app-auth"
    ;
type Props = {
    children: React.ReactNode;
}

const config = {
    androidCliendId: "", // Can't find in google-services.json
    iosClientId: "", // Can't find in GoogleService-Info.plist
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
    authUrl:
        'https://accounts.google.com/o/oauth2/v2/auth' +
        '?client_id=YOUR_CLIENT_ID' +
        '&response_type=token' +
        '&redirect_uri=YOUR_REDIRECT_URI' +
        '&scope=openid%20profile%20email',
}

const AuthContext = createContext({})

export const AuthProvider = ({ children }: Props) => {

    const signInWithGoogle = async () => {
        AuthSession.startAsync(config).then(loginResult => {
            if (loginResult.type === "success") {
                // login...
            }

        });
    }

    return (
        <AuthContext.Provider value={{
            user: "Gabriel Løsnesløkken",
            signInWithGoogle: signInWithGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default function useAuth(): any {
    return useContext(AuthContext);
};
