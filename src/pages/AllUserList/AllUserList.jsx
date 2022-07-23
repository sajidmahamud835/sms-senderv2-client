import "./AllUserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import swal from "sweetalert";

const UserList = () => {
	// const [data, setData] = useState(userRows);
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		const url = `${process.env.REACT_APP_SERVER_URL}/users`;
		fetch(url, {
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => {
				// console.log(res.status);
				if (res.status === 403 || res.status === 401) {
					navigate("/login");
				} else {
					return res.json();
				}
			})
			.then((data) => {
				setDatas(data);
				setIsLoading(false);
			});
	}, [navigate]);

	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const url = `${process.env.REACT_APP_SERVER_URL}/users/${id}`;
				fetch(url, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							swal("Poof! Your data has been deleted!", {
								icon: "success",
							});
							const remainingUsersData = datas.filter(
								(data) => data._id !== id
							);
							setDatas(remainingUsersData);
						}
					});
			} else {
				swal("Your data is safe!");
			}
		});
	};

	// const rowData = [];

	// useEffect(() => {
	// 	let i = 1;
	// 	datas?.map((data) => rowData.push({ ...data, id: i++ }));
	// 	console.log(rowData);

	// }, [datas]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 100,
		},
		{
			field: "displayName",
			headerName: "User",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="userListUser">
						<img
							className="userListImg"
							src={params.row.imageUrl}
							alt={params.row.displayName}
						/>
						{params.row.displayName}
					</div>
				);
			},
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
		},
		{
			field: "isActiveUser",
			headerName: "Status",
			width: 120,
		},
		// {
		// 	field: "transaction",
		// 	headerName: "SMS Credits",
		// 	width: 160,
		// },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row.id}>
							<button className="userListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="userList">
			<div className="userListTitleContainer">
				<h1 className="userTitle">Manage Users</h1>
				<Link to="/newUser">
					<button className="userAddButton">Create</button>
				</Link>
			</div>
			{isLoading && (
				<div className="d-flex justify-content-center align-items-center h-25">
					<span className="text-success">Loading...</span>
				</div>
			)}
			{!isLoading && (
				<>
					<DataGrid
						rows={datas}
						disableSelectionOnClick
						columns={columns}
						pageSize={8}
						checkboxSelection
					/>
				</>
			)}
		</div>
	);
};

export default UserList;
