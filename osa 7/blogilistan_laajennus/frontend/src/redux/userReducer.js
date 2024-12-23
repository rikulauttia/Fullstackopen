// Action Types
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Reducer
const userReducer = (state = null, action) => {
	switch (action.type) {
		case SET_USER:
			return action.data;
		case REMOVE_USER:
			return null;
		default:
			return state;
	}
};

// Action Creators
export const setUser = (user) => ({
	type: SET_USER,
	data: user,
});

export const logoutUser = () => ({
	type: REMOVE_USER,
});

export default userReducer;
