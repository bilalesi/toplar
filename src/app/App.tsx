import './fixAndroidFirebaseWarning';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import firebase from '../firebase';
import { useAccountDispatch } from '@src/contexts/accountContext';
import { useFiltersDispatch } from '@src/contexts/filtersContext';
import { getDefaultUserData, setUserData, getUserData } from '@src/utils/apiUtils';
import { AppProvider } from './AppProvider';
import { AppNavigation } from './AppNavigation';

const App: React.FC = React.memo(() => {
	const accountDispatch = useAccountDispatch();
	const filtersDispatch = useFiltersDispatch();
	const [isAppReady, setIsAppReady] = React.useState(false);

	// Prevent native splash screen from autohiding on mount
	React.useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, []);

	// Update user context when signing in/out
	React.useEffect(() => {
		let hasStartedApp = false;
		const unsubscriber = firebase.auth().onAuthStateChanged(async (authUser) => {
			if (authUser) {
				let data = await getUserData(authUser?.uid);
				if (!data) {
					data = getDefaultUserData();
					await setUserData(authUser?.uid, data);
				}
				if (data.role === 'client') {
					filtersDispatch({ type: 'SET_AVAILABLE', payload: true });
				}
				accountDispatch({
					type: 'SET',
					payload: {
						authUser: {
							uid: authUser.uid,
							email: authUser.email || '',
						},
						user: {
							id: authUser.uid,
							data: {
								active: data.active,
								role: data.role,
								firstName: data.firstName,
								lastName: data.lastName,
							},
						},
					},
				});
			} else {
				accountDispatch({ type: 'RESET' });
				filtersDispatch({ type: 'RESET' });
			}

			// Hide splash screen and show app navigation after first auth state change
			if (!hasStartedApp) {
				hasStartedApp = true;
				setIsAppReady(true);
				setTimeout(() => {
					SplashScreen.hideAsync();
				}, 200);
			}
		});
		return () => {
			unsubscriber();
		};
	}, [accountDispatch, filtersDispatch]);

	if (!isAppReady) {
		return null;
	}

	return <AppNavigation />;
});

export const AppWithProvider: React.FC = React.memo(() => {
	return (
		<AppProvider>
			<App />
		</AppProvider>
	);
});
