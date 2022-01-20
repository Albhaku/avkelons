import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, TextField, CircularProgress, Typography } from '@material-ui/core';

import { apiUrl } from '../config';

const useStyles = () => {
	return {
		loginCardContainer: {
			paddingTop: '200px',
		},
		loginCard: {
			margin: '0 auto',
			maxWidth: '400px',
			textAlign: 'center',
		},
		input: {
			display: 'block',
			marginBottom: '10px',
		},
		button: {
			float: 'right',
		},
	};
};

const LoginComponent = ({ classes, state, handleFieldChange, handleLogin }) => {
	const { email, password, loading } = state;
	return (
		<div className={classes.loginCardContainer}>
			<Card className={classes.loginCard}>
				<CardContent>
					<Typography variant="h2">Login</Typography>
					<form noValidate autoComplete="off">
						<TextField
							className={classes.input}
							fullWidth
							label="Email"
							value={email}
							onChange={(e) => handleFieldChange('email', e.target.value)}
						/>
						<TextField
							className={classes.input}
							fullWidth
							label="Password"
							type="password"
							value={password}
							onChange={(e) => handleFieldChange('password', e.target.value)}
						/>
					</form>
				</CardContent>
				<CardActions>
					<Button
						color="primary"
						className={classes.button}
						variant="contained"
						onClick={() => handleLogin()}
						disabled={!email || !password || loading}
					>
						Submit
						{loading && <CircularProgress style={{ marginLeft: '10px' }} size={18} color="secondary" />}
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

LoginComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	state: PropTypes.object.isRequired,
	handleFieldChange: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired,
};

const Login = ({ classes, handleSetLogged, }) => {
	const [state, setState] = React.useState({
		loading: false,
		email: 'eve.holt@reqres.in',
		password: 'cityslicka',
		// email: '',
		// password: '',
	});

	const handleFieldChange = (field, value) => {
		setState((state) => ({
			...state,
			[field]: value,
		}));
	};

	const handleLogin = async () => {
		const { email, password } = state;
		if (!email || !password) {
			return;
		}
		setState((state) => ({
			...state,
			loading: true,
		}));
		try {
			await axios.post(`${apiUrl}/login`, { email, password });
			setState((state) => ({
				...state,
				loading: false,
			}));
			handleSetLogged(true);
		} catch (err) {
			setState((state) => ({
				...state,
				loading: false,
			}));
		}
	};

	return (
		<LoginComponent classes={classes} handleFieldChange={handleFieldChange} handleLogin={handleLogin} state={state} />
	);
};

export default withStyles(useStyles)(Login);
