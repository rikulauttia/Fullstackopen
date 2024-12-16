const initialState = '';

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload;
		case 'CLEAR_NOTIFICATION':
			return '';
		default:
			return state;
	}
};

export const setNotification = (message, duration = 5) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			payload: message,
		});

		setTimeout(() => {
			dispatch({ type: 'CLEAR_NOTIFICATION' });
		}, duration * 1000);
	};
};

export default notificationReducer;
