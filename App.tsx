import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import ProfileScreen from './screens/profileScreen';
import utilities from './tailwind.json';

export default function App() {
	return (
		// @ts-ignore - TailwindProvider is missing a type definition
		<TailwindProvider utilities={utilities}>
			<ProfileScreen />
		</TailwindProvider>
	);
}
