import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import ProfileScreen from './screens/ProfileScreen';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import useAuth, { AuthProvider } from './hooks/useAuth';
import LoginScreen from './screens/LoginScreen';

const client = new ApolloClient({
	uri: 'https://ginosa.stepzen.net/api/oldfashioned-tuatara/__graphql',
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		// @ts-ignore - TailwindProvider is missing a type definition
		<TailwindProvider utilities={utilities}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					<AuthProvider>
						<AppScreens />
					</AuthProvider>
				</NavigationContainer>
			</ApolloProvider>
		</TailwindProvider>
	);
}

function AppScreens() {
	// For this hook to work, it had to be wrapped in the AuthProvider
	// component, which is why it's not in the App component
	const { user } = useAuth();

	return (
		// Render app if logged in, otherwise render login screen
		<>
			{user ? (
				<RootNavigator />
			) : (
				<LoginScreen />
			)}
		</>
	)
}
