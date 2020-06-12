import React from 'react';

// Types

type State = {
	authUser: AuthUser | null;
	user: User | null;
};
type Action =
	| { type: 'RESET' }
	| { type: 'SET'; payload: { authUser: AuthUser; user: User } };
type Dispatch = (action: Action) => void;

// Contexts

const AccountStateContext = React.createContext<State | undefined>(undefined);
const AccountDispatchContext = React.createContext<Dispatch | undefined>(undefined);

// Inital state

const initialState: State = {
	authUser: null,
	user: null,
};

// Reducer

function accountReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'RESET': {
			return initialState;
		}
		case 'SET': {
			return { ...state, ...action.payload };
		}
		default: {
			throw new Error(`Unhandled action type: ${action!.type}`);
		}
	}
}

// Provider

export const AccountProvider: React.FC = React.memo(({ children }) => {
	const [state, dispatch] = React.useReducer(accountReducer, initialState);
	return (
		<AccountStateContext.Provider value={state}>
			<AccountDispatchContext.Provider value={dispatch}>
				{children}
			</AccountDispatchContext.Provider>
		</AccountStateContext.Provider>
	);
});

// Hooks

export function useAccountState(): State {
	const context = React.useContext(AccountStateContext);
	if (context === undefined) {
		throw new Error('useAccountState must be used within a AccountProvider');
	}
	return context;
}

export function useAccountDispatch(): Dispatch {
	const context = React.useContext(AccountDispatchContext);
	if (context === undefined) {
		throw new Error('useAccountDispatch must be used within a AccountProvider');
	}
	return context;
}
