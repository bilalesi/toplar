import firebase, { getFirebaseApp } from '../firebase';

// Auth

export const signUp = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
	const user = response.user!;
	await setUserData(user.uid, getDefaultUserData(firstName, lastName));
	// TODO: Decide if should send email verification on sign up
	// as currently there's no email verification
	// await user.sendEmailVerification();
	return response;
};

export const signIn = (email: string, password: string) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const resetPassword = (email: string) => {
	return firebase.auth().sendPasswordResetEmail(email);
};

export const signOut = () => {
	return firebase.auth().signOut();
};

// Users

export const getDefaultUserData = (firstName: string = '', lastName: string = '') => {
	const data: UserData = {
		role: 'client',
		active: true,
		firstName,
		lastName,
	};
	return data;
};

export const getUserData = async (id: string) => {
	const response = await firebase.firestore().collection('users').doc(id).get();
	return response.data() as UserData | undefined;
};

// Workaround for creating user (aka sign up) without automatically signing in
// https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
export const addUserData = async (data: UserData, email: string, password: string) => {
	const secondaryFirebase = getFirebaseApp('secondary');
	const response = await secondaryFirebase
		.auth()
		.createUserWithEmailAndPassword(email, password);
	const user = response.user!;
	await setUserData(user.uid, data);
	// TODO: Decide if should send email verification on sign up
	// as currently there's no email verification
	// await user.sendEmailVerification();
	secondaryFirebase.auth().signOut();
	return response;
};

export const setUserData = (id: string, data: UserData) => {
	return firebase.firestore().collection('users').doc(id).set(data, { merge: true });
};

export const getUsers = async (role: UserRole) => {
	const items: User[] = [];
	const querySnapshot = await firebase
		.firestore()
		.collection('users')
		.where('role', '==', role)
		.orderBy('firstName', 'asc')
		.orderBy('lastName', 'asc')
		.get();
	querySnapshot.docs.map((documentSnapshot) => {
		items.push({
			id: documentSnapshot.id,
			data: documentSnapshot.data() as UserData,
		});
	});
	return items;
};

// Properties

export const addPropertyData = (newData: NewPropertyData, creatorUserId: string) => {
	const data: PropertyData = {
		...newData,
		createTime: Date.now(),
		creatorUserId,
	};
	return firebase.firestore().collection('properties').add(data);
};

export const setPropertyData = (id: string, data: NewPropertyData) => {
	return firebase.firestore().collection('properties').doc(id).set(data, { merge: true });
};

export const deletePropertyData = (id: string) => {
	return firebase.firestore().collection('properties').doc(id).delete();
};

export const getProperties = async (available: boolean | null) => {
	const items: Property[] = [];
	const collectionRef = firebase.firestore().collection('properties');
	const filteredCollectionRef =
		typeof available === 'boolean'
			? collectionRef.where('available', '==', available)
			: collectionRef.orderBy('available', 'desc');
	const querySnapshot = await filteredCollectionRef.orderBy('createTime', 'desc').get();
	querySnapshot.docs.map((documentSnapshot) => {
		items.push({
			id: documentSnapshot.id,
			data: documentSnapshot.data() as PropertyData,
		});
	});
	return items;
};
