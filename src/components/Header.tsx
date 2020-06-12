import React from 'react';
import { Appbar } from 'react-native-paper';

type Props = {
	title: string;
	subtitle?: string;
	disabled?: boolean;
	onReturnPress?: () => void;
	onEditPress?: () => void;
};

export const Header: React.FC<Props> = React.memo(
	({ title, subtitle, disabled = false, onReturnPress, onEditPress }) => {
		return (
			<Appbar.Header pointerEvents={disabled ? 'none' : 'auto'}>
				{onReturnPress && (
					<Appbar.BackAction disabled={disabled} onPress={onReturnPress} />
				)}
				<Appbar.Content title={title} subtitle={subtitle} />
				{onEditPress && (
					<Appbar.Action icon="pencil" disabled={disabled} onPress={onEditPress} />
				)}
			</Appbar.Header>
		);
	}
);
