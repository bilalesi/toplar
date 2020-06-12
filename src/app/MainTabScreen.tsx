import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack/types';
import { PropertiesListScreen } from '@src/properties/PropertiesListScreen';
import { PropertiesMapScreen } from '@src/properties/PropertiesMapScreen';
import { UsersTabScreen } from '@src/users/UsersTabScreen';
import { SettingsScreen } from '@src/settings/SettingsScreen';
import { RootStackParamList } from './AppNavigation';
import { useAccountState } from '@src/contexts/accountContext';
import { RouteProp } from '@react-navigation/native';

export type MainTabParamList = {
	PropertiesList: undefined;
	PropertiesMap: undefined;
	UsersTab: undefined;
	Settings: undefined;
};

const MainTab = createMaterialBottomTabNavigator<MainTabParamList>();

type Props = {
	route: RouteProp<RootStackParamList, 'MainTab'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'MainTab'>;
};

export const MainTabScreen: React.FC<Props> = React.memo(() => {
	const accountState = useAccountState();

	return (
		<MainTab.Navigator activeColor="#FFFFFF" barStyle={{ backgroundColor: '#6100ee' }}>
			<MainTab.Screen
				name="PropertiesList"
				component={PropertiesListScreen}
				options={{ tabBarIcon: 'home-city', title: 'Properties' }}
			/>
			<MainTab.Screen
				name="PropertiesMap"
				component={PropertiesMapScreen}
				options={{ tabBarIcon: 'map', title: 'Map' }}
			/>
			{accountState.user?.data.role === 'admin' && (
				<MainTab.Screen
					name="UsersTab"
					component={UsersTabScreen}
					options={{ tabBarIcon: 'account-group', title: 'Users' }}
				/>
			)}
			<MainTab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{ tabBarIcon: 'settings', title: 'Settings' }}
			/>
		</MainTab.Navigator>
	);
});
