import React from 'react';
import { RootStackParamList } from '@src/app/AppNavigation';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';
import { FilterScreen } from './FilterScreen';

const OPTIONS = [25, 50, 100, 125, 150, 175, 200, 225, 250, 275, 300];

type Props = {
	route: RouteProp<RootStackParamList, 'FilterSize'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'FilterSize'>;
};

export const FilterSizeScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const getOptionLabel = React.useCallback((value: number) => {
		return `Min ${value} sq.m`;
	}, []);

	const handleReturnPress = React.useCallback(() => {
		navigation.pop();
	}, [navigation]);

	return (
		<FilterScreen
			subtitle="Floor area size"
			options={OPTIONS}
			getOptionLabel={getOptionLabel}
			stateFieldName="minSizeSqm"
			dispatchSetActionType="SET_MIN_SIZE_SQM"
			onReturnPress={handleReturnPress}
		/>
	);
});
