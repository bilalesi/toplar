import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack/types';
import { Button, TextInput } from 'react-native-paper';
import { Separator } from '@src/components/Separator';
import { RootStackParamList } from '@src/app/AppNavigation';
import { RouteProp } from '@react-navigation/native';
import { resetPassword } from '@src/utils/apiUtils';
import { isValidEmail } from '@src/utils/formUtils';
import { Header } from '@src/components/Header';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f8fa',
	},
	scrollContainer: {
		flex: 1,
		zIndex: -1,
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingVertical: 32,
	},
});

type Props = {
	route: RouteProp<RootStackParamList, 'ResetPassword'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;
};

export const ResetPasswordScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [email, setEmail] = React.useState('');

	const canSubmit = email.trim().length && isValidEmail(email.trim());

	const handleReturnPress = React.useCallback(() => {
		navigation.pop();
	}, [navigation]);

	const handleSubmitPress = React.useCallback(() => {
		const submit = async () => {
			setIsSubmitting(true);
			try {
				await resetPassword(email.trim());
				navigation.navigate('SignIn');
			} catch (error) {
				Alert.alert(error.message);
				setIsSubmitting(false);
			}
		};
		submit();
	}, [email, navigation]);

	return (
		<View style={styles.container}>
			<Header title="Reset Password" onReturnPress={handleReturnPress} />
			<KeyboardAwareScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				pointerEvents={isSubmitting ? 'none' : 'auto'}
				directionalLockEnabled
				keyboardDismissMode="on-drag"
				extraScrollHeight={16}
			>
				<TextInput
					label="Email"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
					disableFullscreenUI
					autoCapitalize="none"
				/>
				<Separator />
				<Button
					mode="contained"
					disabled={!canSubmit}
					onPress={handleSubmitPress}
					loading={isSubmitting}
				>
					Submit
				</Button>
			</KeyboardAwareScrollView>
		</View>
	);
});
