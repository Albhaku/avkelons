import { Theme, createTheme } from '@material-ui/core';
import { blue, grey, indigo } from '@material-ui/core/colors';

/**
 * @name theme
 * @type Theme
 */
export const theme = createTheme({
	typography: {
		fontFamily: 'sans-serif',
	},
	palette: {
		background: {
			default: grey[50],
		},
		primary: {
			main: indigo[600],
		},
		secondary: {
			main: blue[600],
		},
	},
	overrides: {
		MuiTextField: {
			root: {
				'& input': {
					paddingLeft: '10px',
				},
			},
		},
	},
});
