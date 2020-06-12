import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack/types';
import { useSafeArea } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { RootStackParamList } from '@src/app/AppNavigation';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { MainTabParamList } from '@src/app/MainTabScreen';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { ClientsScreen } from './ClientsScreen';
import { RealtorsScreen } from './RealtorsScreen';
import { AdminsScreen } from './AdminsScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	addButton: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#6100ee',
		color: 'white',
	},
});

export type UsersTabParamList = {
	Clients: undefined;
	Realtors: undefined;
	Admins: undefined;
};

const UsersTab = createMaterialTopTabNavigator<UsersTabParamList>();

type Props = {
	route: RouteProp<MainTabParamList, 'UsersTab'>;
	navigation: CompositeNavigationProp<
		MaterialBottomTabNavigationProp<MainTabParamList, 'UsersTab'>,
		NativeStackNavigationProp<RootStackParamList>
	>;
};

export const UsersTabScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const insets = useSafeArea();

	const handleAddPress = React.useCallback(() => {
		navigation.push('UserEdit');
	}, [navigation]);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<UsersTab.Navigator
				tabBarOptions={{
					indicatorStyle: { backgroundColor: '#6100ee' },
				}}
			>
				<UsersTab.Screen
					name="Clients"
					component={ClientsScreen}
					options={{ title: 'Clients' }}
				/>
				<UsersTab.Screen
					name="Realtors"
					component={RealtorsScreen}
					options={{ title: 'Realtors' }}
				/>
				<UsersTab.Screen
					name="Admins"
					component={AdminsScreen}
					options={{ title: 'Admins' }}
				/>
			</UsersTab.Navigator>
			<FAB
				style={styles.addButton}
				icon="account-plus"
				color="#FFFFFF"
				label="Add"
				onPress={handleAddPress}
			/>
		</View>
	);
});
