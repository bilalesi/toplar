import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Divider, RadioButton } from 'react-native-paper';
import { Separator } from '@src/components/Separator';
import { Header } from '@src/components/Header';
import { useFiltersDispatch, useFiltersState } from '@src/contexts/filtersContext';

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
	subtitle: string;
	options: number[];
	getOptionLabel: (value: number) => string;
	stateFieldName: 'maxPcmGbp' | 'minSizeSqm' | 'minNumRooms';
	dispatchSetActionType: 'SET_MAX_PCM_GBP' | 'SET_MIN_SIZE_SQM' | 'SET_MIN_NUM_ROOMS';
	onReturnPress: () => void;
};

export const FilterScreen: React.FC<Props> = React.memo(
	({
		subtitle,
		options,
		getOptionLabel,
		stateFieldName,
		dispatchSetActionType,
		onReturnPress,
	}) => {
		const filtersState = useFiltersState();
		const filtersDispatch = useFiltersDispatch();

		const value =
			filtersState[stateFieldName] === null ? '' : String(filtersState[stateFieldName]);
		const handleValueChange = React.useCallback(
			(newValue: string) => {
				filtersDispatch({
					type: dispatchSetActionType,
					payload: newValue === value ? null : Number(newValue),
				});
				setTimeout(() => {
					onReturnPress();
				}, 250);
			},
			[value, dispatchSetActionType, filtersDispatch, onReturnPress]
		);

		const handleClearPress = React.useCallback(() => {
			filtersDispatch({ type: dispatchSetActionType, payload: null });
			onReturnPress();
		}, [dispatchSetActionType, filtersDispatch, onReturnPress]);

		return (
			<View style={styles.container}>
				<Header title="Filters" subtitle={subtitle} onReturnPress={onReturnPress} />
				<ScrollView
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContent}
					directionalLockEnabled
					keyboardDismissMode="on-drag"
				>
					<RadioButton.Group onValueChange={handleValueChange} value={value}>
						{options.map((item, index) => (
							<React.Fragment key={item}>
								{index !== 0 && <Divider />}
								<RadioButton.Item
									color="#6100ee"
									label={getOptionLabel(item)}
									value={String(item)}
								/>
							</React.Fragment>
						))}
					</RadioButton.Group>
					<Separator variant="large" />
					<Button mode="outlined" onPress={handleClearPress}>
						Clear
					</Button>
				</ScrollView>
			</View>
		);
	}
);
