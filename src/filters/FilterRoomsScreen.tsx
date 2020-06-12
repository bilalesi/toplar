import React from 'react';
import { RootStackParamList } from '@src/app/AppNavigation';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';
import { FilterScreen } from './FilterScreen';

const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
	route: RouteProp<RootStackParamList, 'FilterRooms'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'FilterRooms'>;
};

export const FilterRoomsScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const getOptionLabel = React.useCallback((value: number) => {
		return `Min ${value}`;
	}, []);

	const handleReturnPress = React.useCallback(() => {
		navigation.pop();
	}, [navigation]);

	return (
		<FilterScreen
			subtitle="Number of rooms"
			options={OPTIONS}
			getOptionLabel={getOptionLabel}
			stateFieldName="minNumRooms"
			dispatchSetActionType="SET_MIN_NUM_ROOMS"
			onReturnPress={handleReturnPress}
		/>
	);
});
