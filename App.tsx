import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import ProfileScreen from './screens/ProfileScreen';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	return (
		// @ts-ignore - TailwindProvider is missing a type definition
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<ProfileScreen />
			</NavigationContainer>
		</TailwindProvider>
	);
}
