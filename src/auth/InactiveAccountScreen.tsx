import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack/types';
import { Button, Title, Headline } from 'react-native-paper';
import { Separator } from '@src/components/Separator';
import { RootStackParamList } from '@src/app/AppNavigation';
import { RouteProp } from '@react-navigation/native';
import { signOut } from '@src/utils/apiUtils';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f8fa',
		padding: 16,
		justifyContent: 'center',
	},
	emoji: {
		textAlign: 'center',
		fontSize: 96,
		lineHeight: 96 * 1.5,
	},
	headline: {
		textAlign: 'center',
	},
});

type Props = {
	route: RouteProp<RootStackParamList, 'InactiveAccount'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'InactiveAccount'>;
};

export const InactiveAccountScreen: React.FC<Props> = React.memo(() => {
	const handleSignOutPress = React.useCallback(() => {
		const submit = async () => {
			try {
				await signOut();
			} catch (error) {
				Alert.alert(error.message);
			}
		};
		submit();
	}, []);

	return (
		<View style={styles.container}>
			<View>
				<Title style={styles.emoji}>😔</Title>
				<Separator />
				<Headline style={styles.headline}>
					Unfortunately your account has been disabled. Please contact the support team at
					danilo@grifo.tv for more details.
				</Headline>
			</View>
			<Separator variant="large" />
			<Button mode="contained" onPress={handleSignOutPress}>
				Return
			</Button>
		</View>
	);
});
