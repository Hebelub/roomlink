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
		Authorization: `Apikey ginosa::stepzen.net+1000::3d1b43544860580ffe49faf6b1d4ed57a6599fea95db5e6280247a6d8193aa73`,
		// Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY?.replace(/\\n/g, '\n')}`,
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
						<RootNavigator />
					</AuthProvider>
				</NavigationContainer>
			</ApolloProvider>
		</TailwindProvider>
	);
}
