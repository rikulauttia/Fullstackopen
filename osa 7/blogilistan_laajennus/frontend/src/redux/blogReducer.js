import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		addBlog(state, action) {
			state.push(action.payload);
		},
	},
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const createdBlog = await blogService.create(newBlog);
		dispatch(addBlog(createdBlog));
	};
};

export default blogSlice.reducer;
