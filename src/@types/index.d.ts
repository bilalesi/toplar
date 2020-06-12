type AuthUser = {
	uid: string;
	email: string;
};

type UserRole = 'client' | 'realtor' | 'admin';

type UserData = {
	active: boolean;
	firstName: string;
	lastName: string;
	role: UserRole;
};

type User = {
	id: string;
	data: UserData;
};

type NewPropertyData = {
	available: boolean;
	name: string;
	description: string;
	pcmGbp: number;
	sizeSqm: number;
	numRooms: number;
	// `coordinate` is identical type to `LatLng` from `react-native-maps`
	coordinate: {
		latitude: number;
		longitude: number;
	};
};

type PropertyData = NewPropertyData & {
	createTime: number;
	creatorUserId: string;
};

type Property = {
	id: string;
	data: PropertyData;
};
