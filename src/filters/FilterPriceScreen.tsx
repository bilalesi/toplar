import React from 'react';
import { RootStackParamList } from '@src/app/AppNavigation';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';
import { FilterScreen } from './FilterScreen';
import { getDisplayPrice } from '@src/utils/priceUtils';

const OPTIONS = [
	500,
	750,
	1000,
	1250,
	1500,
	1750,
	2000,
	2250,
	2500,
	2750,
	3000,
	3250,
	3500,
	3750,
	4000,
	4250,
	4500,
	4750,
	5000,
];

type Props = {
	route: RouteProp<RootStackParamList, 'FilterPrice'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'FilterPrice'>;
};

export const FilterPriceScreen: React.FC<Props> = React.memo(({ navigation }) => {
	const getOptionLabel = React.useCallback((value: number) => {
		return `Max £${getDisplayPrice(value)} p/m`;
	}, []);

	const handleReturnPress = React.useCallback(() => {
		navigation.pop();
	}, [navigation]);

	return (
		<FilterScreen
			subtitle="Price per month"
			options={OPTIONS}
			getOptionLabel={getOptionLabel}
			stateFieldName="maxPcmGbp"
			dispatchSetActionType="SET_MAX_PCM_GBP"
			onReturnPress={handleReturnPress}
		/>
	);
});
