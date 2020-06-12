import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useAccountState } from '@src/contexts/accountContext';
import { IntroScreen } from '@src/intro/IntroScreen';
import { SignInScreen } from '@src/auth/SignInScreen';
import { SignUpScreen } from '@src/auth/SignUpScreen';
import { ResetPasswordScreen } from '@src/auth/ResetPasswordScreen';
import { InactiveAccountScreen } from '@src/auth/InactiveAccountScreen';
import { MainTabScreen } from './MainTabScreen';
import { PropertyScreen } from '@src/properties/PropertyScreen';
import { PropertyEditScreen } from '@src/properties/PropertyEditScreen';
import { UserScreen } from '@src/users/UserScreen';
import { UserEditScreen } from '@src/users/UserEditScreen';
import { FilterPriceScreen } from '@src/filters/FilterPriceScreen';
import { FilterSizeScreen } from '@src/filters/FilterSizeScreen';
import { FilterRoomsScreen } from '@src/filters/FilterRoomsScreen';
import { LocationSearchScreen } from '@src/properties/LocationSearchScreen';

enableScreens();

export type RootStackParamList = {
	// Screens before signing in
	Intro: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ResetPassword: undefined;
	// Screens after signing in with inactive account
	InactiveAccount: undefined;
	// Screens after signing in with active account
	MainTab: undefined;
	Property: { item: Property };
	PropertyEdit:
		| {
				item?: Property;
				coordinate?: {
					latitude: number;
					longitude: number;
				};
		  }
		| undefined;
	User: { item: User };
	UserEdit: { item: User } | undefined;
	FilterPrice: undefined;
	FilterSize: undefined;
	FilterRooms: undefined;
	LocationSearch: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation: React.FC = React.memo(() => {
	const accountState = useAccountState();

	const isSignedIn = React.useMemo(() => {
		return !!accountState.user;
	}, [accountState.user]);

	const isUserActive = React.useMemo(() => {
		return !!accountState.user?.data.active;
	}, [accountState.user]);

	return (
		<NavigationContainer>
			<RootStack.Navigator
				screenOptions={{ stackPresentation: 'modal', headerShown: false }}
			>
				{!isSignedIn && (
					<>
						<RootStack.Screen name="Intro" component={IntroScreen} />
						<RootStack.Screen name="SignIn" component={SignInScreen} />
						<RootStack.Screen name="SignUp" component={SignUpScreen} />
						<RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
					</>
				)}
				{isSignedIn && !isUserActive && (
					<RootStack.Screen name="InactiveAccount" component={InactiveAccountScreen} />
				)}
				{isSignedIn && isUserActive && (
					<>
						<RootStack.Screen name="MainTab" component={MainTabScreen} />
						<RootStack.Screen name="Property" component={PropertyScreen} />
						<RootStack.Screen name="PropertyEdit" component={PropertyEditScreen} />
						<RootStack.Screen name="User" component={UserScreen} />
						<RootStack.Screen name="UserEdit" component={UserEditScreen} />
						<RootStack.Screen name="FilterPrice" component={FilterPriceScreen} />
						<RootStack.Screen name="FilterSize" component={FilterSizeScreen} />
						<RootStack.Screen name="FilterRooms" component={FilterRoomsScreen} />
						<RootStack.Screen name="LocationSearch" component={LocationSearchScreen} />
					</>
				)}
			</RootStack.Navigator>
		</NavigationContainer>
	);
});
