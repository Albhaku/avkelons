import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles, Typography, AppBar, Button, Toolbar, Avatar } from '@material-ui/core';

import { apiUrl } from '../config';

const useStyles = () => {
	return {
		container: {
			height: '600px',
			padding: '15px 25px',
			backgroundColor: '#fff',
		},
		logoutButton: {
			marginLeft: 'auto',
		},
		usersGrid: {
			marginTop: '30px',
		},
	};
};

const UsersComponent = ({ classes, state, gridColumns, handlePageChange, handleUsersChange, handleLogout }) => {
	const {
		usersList,
		paginationData: { pageSize, total },
		editingUser,
	} = state;
	return (
		<div className={classes.container}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<Typography variant="h5">Welcome to users list</Typography>
					<Button color="primary" variant="outlined" className={classes.logoutButton} onClick={() => handleLogout()}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<DataGrid
				className={classes.usersGrid}
				rows={usersList}
				columns={gridColumns}
				rowCount={total}
				pageSize={pageSize}
				paginationMode="server"
				disableSelectionOnClick
				editRowsModel={editingUser}
				onEditRowsModelChange={handleUsersChange}
				onPageChange={(page) => handlePageChange(page)}
			/>
		</div>
	);
};

UsersComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	state: PropTypes.object.isRequired,
	gridColumns: PropTypes.array.isRequired,
	handlePageChange: PropTypes.func.isRequired,
	handleUsersChange: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
};

const Users = ({ classes, handleSetLogged }) => {
	const [state, setState] = React.useState({
		usersList: [],
		paginationData: {
			total: 0,
			page: 1,
			totalPages: 0,
			pageSize: 6,
		},
		editingUser: {},
	});

	React.useEffect(() => {
		loadUsers();
	}, [state.paginationData.page]);

	const loadUsers = async () => {
		const {
			paginationData: { page },
		} = state;

		const response = await axios.get(`${apiUrl}/users?page=${page}`);
		setState((state) => ({
			...state,
			usersList: response.data.data,
			paginationData: {
				...state.paginationData,
				totalPages: response.data.total_pages,
				total: response.data.total,
				pageSize: response.data.per_page,
			},
		}));
	};

	const handlePageChange = (page) => {
		setState((state) => ({
			...state,
			paginationData: {
				...state.paginationData,
				page: page + 1,
			},
		}));
	};

	const handleDeleteUser = async (userId) => {
		const { usersList } = state;
		try {
			await axios.delete(`${apiUrl}/users/${userId}`);
			setState((state) => ({
				...state,
				usersList: usersList.filter((user) => user.id !== userId),
			}));
		} catch (err) {}
	};

	const handleUsersChange = (event) => {
		if (!Object.keys(event).length) {
			updateUser();
		}
		setState((state) => ({
			...state,
			editingUser: event,
		}));
	};

	const handleLogout = () => {
		handleSetLogged(false);
	}

	const updateUser = async () => {
		const { editingUser } = state;
		const id = Object.keys(editingUser)[0];
		const field = Object.keys(editingUser[id])[0];
		await axios.patch(`${apiUrl}/users/${id}`, { [field]: editingUser[id][field].value });
	};

	const gridColumns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'avatar',
			headerName: 'Image',
			sortable: false,
			width: 180,
			renderCell: (cellValues) => {
				return <Avatar src={cellValues.row.avatar} alt={cellValues.row.firstName} />;
			},
		},
		{
			field: 'first_name',
			headerName: 'First name',
			editable: true,
			width: 150,
		},
		{
			field: 'last_name',
			headerName: 'Last name',
			editable: true,
			width: 150,
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
		},
		{
			field: 'delete',
			headerName: 'Delete',
			sortable: false,
			width: 100,
			renderCell: (cellValues) => {
				return (
					<IconButton aria-label="delete" onClick={() => handleDeleteUser(cellValues.row.id)}>
						<DeleteIcon />
					</IconButton>
				);
			},
		},
	];

	return (
		<UsersComponent
			classes={classes}
			state={state}
			gridColumns={gridColumns}
			handlePageChange={handlePageChange}
			handleUsersChange={handleUsersChange}
			handleLogout={handleLogout}
		/>
	);
};

export default withStyles(useStyles)(Users);
