import React from 'react';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { MainTabParamList } from '@src/app/MainTabScreen';
import { UsersList } from './UsersList';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { UsersTabParamList } from './UsersTabScreen';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '@src/app/AppNavigation';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

type Props = {
	route: RouteProp<UsersTabParamList, 'Admins'>;
	navigation: CompositeNavigationProp<
		MaterialTopTabNavigationProp<UsersTabParamList, 'Admins'>,
		CompositeNavigationProp<
			MaterialBottomTabNavigationProp<MainTabParamList>,
			NativeStackNavigationProp<RootStackParamList>
		>
	>;
};

export const AdminsScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const handleItemPress = React.useCallback(
		(item: User) => {
			navigation.push('User', { item });
		},
		[navigation]
	);

	return <UsersList onItemPress={handleItemPress} role="admin" />;
});
