import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
		background: {
			default: '#f5f5f5',
		},
	},
	typography: {
		h1: {
			fontSize: '2.2rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '1.8rem',
			fontWeight: 500,
		},
		h3: {
			fontSize: '1.6rem',
			fontWeight: 500,
		},
	},
});

export default theme;
