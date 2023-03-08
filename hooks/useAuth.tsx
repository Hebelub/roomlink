import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
// import * as Google from 'expo-google-app-auth'

type Props = {
    children: React.ReactNode;
}

// const config = {
//     scopes: ["profile", "email"],
//     permissions:
// }

const AuthContext = createContext({})

export const AuthProvider = ({ children }: Props) => {

    return (
        <AuthContext.Provider value={{
            user: {
                name: "Gabriel"
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export default function useAuth(): any {
    return useContext(AuthContext);
};
