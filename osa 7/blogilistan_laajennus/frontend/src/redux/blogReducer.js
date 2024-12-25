import blogService from '../services/blogs';

// Action Types
const INIT_BLOGS = 'INIT_BLOGS';
const CREATE_BLOG = 'CREATE_BLOG';
const LIKE_BLOG = 'LIKE_BLOG';
const REMOVE_BLOG = 'REMOVE_BLOG';
const ADD_COMMENT = 'ADD_COMMENT';

// Reducer
const blogReducer = (state = [], action) => {
	switch (action.type) {
		case INIT_BLOGS:
			return action.data;
		case CREATE_BLOG:
			return [...state, action.data];
		case LIKE_BLOG:
			return state.map((blog) =>
				blog.id === action.data.id
					? { ...blog, likes: action.data.likes }
					: blog
			);
		case REMOVE_BLOG:
			return state.filter((blog) => blog.id !== action.data);
		case ADD_COMMENT:
			return state.map((blog) =>
				blog.id === action.data.id
					? { ...blog, comments: action.data.comments }
					: blog
			);
		default:
			return state;
	}
};

// Action Creators
export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch({
			type: INIT_BLOGS,
			data: blogs,
		});
	};
};

export const createBlog = (blogObject) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blogObject);
		dispatch({
			type: CREATE_BLOG,
			data: newBlog,
		});
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(blog.id, {
			...blog,
			likes: blog.likes + 1,
		});
		dispatch({
			type: LIKE_BLOG,
			data: updatedBlog,
		});
	};
};

export const removeBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch({
			type: REMOVE_BLOG,
			data: id,
		});
	};
};

export const addComment = (id, comment) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.addComment(id, { comment });
		dispatch({
			type: ADD_COMMENT,
			data: updatedBlog,
		});
	};
};

export default blogReducer;
