import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './blogReducer';
import notificationReducer from './notificationReducer';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
	},
});

export default store;
