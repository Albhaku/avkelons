import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import Login from './components/Login';
import Users from './components/Users';
import { theme } from './material-ui.theme';

const App = () => {
	const [state, setState] = React.useState({ loggedIn: false });
	const { loggedIn } = state;

	const handleSetLogged = (logged) => {
		setState({ loggedIn: logged });
	};

	return loggedIn ? <Users handleSetLogged={handleSetLogged} /> : <Login handleSetLogged={handleSetLogged} />;
};
const Root = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>
);

let container = document.getElementById('app');
let component = <Root />;

render(component, container);
