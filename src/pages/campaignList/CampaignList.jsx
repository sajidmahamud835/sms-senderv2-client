import React, { useEffect } from 'react';
import "./CampaignList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import UseFirebase from "../../Hooks/UseFirebase";

const CampaignList = () => {
	const [cdata, setCData] = useState([]);
	const [rowData, setRowData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { user, loading } = UseFirebase();

	useEffect(() => {
		if (!loading && user) {
			fetch(
				`${process.env.REACT_APP_SERVER_URL}/campaigns/user/${user.email}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			)
				.then((res) => {
					// console.log(res.status);
					if (res.status === 403 || res.status === 401) {
						navigate("/login");
					} else {
						return res.json();
					}
				})
				.then((data) => {
					setCData(data);
					setIsLoading(false);
					console.log(data);
				});
		}
	}, [loading, navigate, user]);

	useEffect(() => {
		let id = 1;
		const initArray = [];
		cdata?.map((list) => {
			const newList = { ...list, id: id };
			id++;
			initArray.push(newList);
			return 0;
		});
		setRowData(initArray);
	}, [cdata]);

	const handleDelete = (id) => {
		if (id) {
			swal({
				title: "Are you sure?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willAdd) => {
				if (willAdd) {
					const url = `${process.env.REACT_APP_SERVER_URL}/campaigns/${id}`;
					fetch(url, {
						method: "DELETE",
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.deletedCount > 0) {
								swal("Campaign is Deleted", {
									icon: "success",
								});
								setRowData(rowData.filter((item) => item._id !== id));
							}
						});
				} else {
					swal("Sorry Some Error occurs!");
				}
			});
		}
	};

	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 100,
			renderCell: (params) => {
				return <div className="campaignListItem">{params.row.id}</div>;
			},
		},
		{
			field: "name",
			headerName: "Campaign Name",
			width: 200,
			renderCell: (params) => {
				return <div className="campaignListItem">{params.row.name}</div>;
			},
		},
		{
			field: "number",
			headerName: "Contacts",
			width: 200,
			renderCell: (params) => {
				return <div className="campaignListItem">{params.row.number}</div>;
			},
		},
		{
			field: "status",
			headerName: "Status",
			width: 120,
		},
		// {
		//   field: "smssent",
		//   headerName: "SMS Sent",
		//   width: 160,
		// },
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						<Link to={"/campaign/" + params.row._id}>
							<button className="campaignListEdit">Details</button>
						</Link>
						<Link to={"/updateCampaign/" + params.row._id}>
							<button className="campaignListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="campaignListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</div>
				);
			},
		},
	];
	return (
		<div className="campaignList ">
			<div className="campaignTitleContainer">
				<h1 className="campaignTitle">Manage Campaigns</h1>
				<Link to="/newCampaign">
					<button className="campaignAddButton">Create</button>
				</Link>
			</div>
			{isLoading && (
				<div className="d-flex justify-content-center align-items-center h-25">
					<span className="text-success">Loading...</span>
				</div>
			)}
			{!isLoading && (
				<DataGrid
					rows={rowData}
					disableSelectionOnClick
					columns={columns}
					pageSize={8}
					checkboxSelection
				/>
			)}
		</div>
	);
};

export default CampaignList;
