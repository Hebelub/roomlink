import React from 'react';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { AuthProvider } from './hooks/useAuth';


export default function App() {
	return (
		// @ts-ignore - TailwindProvider is missing a type definition
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<AuthProvider>
					<RootNavigator />
				</AuthProvider>
			</NavigationContainer>
		</TailwindProvider>
	);
}
