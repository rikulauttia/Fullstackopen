import axios from 'axios';

// Action Types
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_USERS = 'SET_USERS';

// Reducer
const userReducer = (state = { user: null, users: [] }, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.data };
		case REMOVE_USER:
			return { ...state, user: null };
		case SET_USERS:
			return { ...state, users: action.data };
		default:
			return state;
	}
};

export const setUser = (user) => ({
	type: SET_USER,
	data: user,
});

export const logoutUser = () => ({
	type: REMOVE_USER,
});

export const initializeUsers = () => {
	return async (dispatch) => {
		const response = await axios.get('http://localhost:3003/api/users');
		dispatch({
			type: SET_USERS,
			data: response.data,
		});
	};
};

export default userReducer;
