import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Separator } from '@src/components/Separator';
import { getUsers } from '@src/utils/apiUtils';
import { UserCard } from '../components/UserCard';
import { useAccountState } from '@src/contexts/accountContext';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f8fa',
	},
	content: {
		padding: 16,
	},
});

type Props = {
	role: UserRole;
	onItemPress: (item: User) => void;
};

export const UsersList: React.FC<Props> = React.memo(({ role, onItemPress }) => {
	const accountState = useAccountState();
	const [items, setItems] = React.useState<User[]>([]);

	useFocusEffect(
		React.useCallback(() => {
			async function load() {
				try {
					const data = await getUsers(role);
					setItems(data);
				} catch (error) {
					console.log('error loading users', error);
				}
			}

			load();
		}, [role])
	);

	const renderItem = React.useCallback(
		({ item }: { item: User }) => {
			return (
				<UserCard
					item={item}
					email={
						accountState.user?.id === item.id ? accountState.authUser?.email : undefined
					}
					onPress={onItemPress}
				/>
			);
		},
		[accountState.authUser, accountState.user, onItemPress]
	);

	return (
		<FlatList
			style={styles.container}
			contentContainerStyle={styles.content}
			data={items}
			renderItem={renderItem}
			ItemSeparatorComponent={Separator}
			directionalLockEnabled
			ListFooterComponent={() => <View style={{ height: 68 }} />}
		/>
	);
});
