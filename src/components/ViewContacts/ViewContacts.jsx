import { Container } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../ViewContacts/ViewContacts.css";

const ViewContacts = () => {
	let { Id } = useParams();
	const [listData, setListData] = useState({});
	const [rowData, setRowData] = useState([]);
	const navigate = useNavigate();
	console.log("rowData", rowData);
	const [isEdit, setIsEdit] = useState("");
	const [updatedContact, setUpdatedContact] = useState({});

	console.log(updatedContact);

	const updateNumber = (e) => {
		const value = e.target.value;
		updatedContact.mobile = value;
	};

	const updateName = (e) => {
		const value = e.target.value;
		updatedContact.name = value;
	};

	// console.log(
	// 	`${process.env.REACT_APP_SERVER_URL}/single-contact/${Id}/${dataObj.id}`
	// );

	const saveEdit = (dataObj) => {
		console.log(dataObj.id);

		const url = `${process.env.REACT_APP_SERVER_URL}/single-contact/${Id}/${dataObj.id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updatedContact),
		}).then((res) => res.json());

		setIsEdit("");
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/contacts/${Id}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => {
				if (res.status === 403 || res.status === 401) {
					navigate("/login");
				} else {
					return res.json();
				}
			})
			.then((data) => setListData(data[0]));
	}, [Id, navigate]);

	useEffect(() => {
		// setRowData(listData?.array);
		if (listData.array) {
			let id = 1;
			const initialArray = [];
			listData.array.map((list) => {
				const newList = { ...list, id: id };
				id++;
				initialArray.push(newList);
				return 0;
			});

			setRowData(initialArray);
		}
	}, [listData]);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 70,
		},
		{
			field: "mobile",
			headerName: "Number",
			type: "number",
			width: 210,
			renderCell: (params) => {
				return (
					<div id="number">
						{isEdit === params.row.id ? (
							<div className="d-flex align-items-center">
								<input
									className="form-control"
									defaultValue={params.row.mobile}
									onChange={(e) => updateNumber(e)}
								/>
							</div>
						) : (
							<div>{params.row.mobile}</div>
						)}
					</div>
				);
			},
		},
		{
			field: "name",
			headerName: "Full name",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			width: 210,
			renderCell: (params) => {
				return (
					<div id="number">
						{isEdit === params.row.id ? (
							<div className="d-flex align-items-center">
								<input
									className="form-control"
									defaultValue={params.row.name}
									onChange={(e) => updateName(e)}
								/>
								<button
									className="ms-2 btn btn-primary btn-sm"
									onClick={() => saveEdit(params.row)}
								>
									Save
								</button>
							</div>
						) : (
							<div>{params.row.name}</div>
						)}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<div className="d-flex align-items-center">
						<button
							onClick={() => {
								setIsEdit(params.row.id);
								setUpdatedContact(params.row);
							}}
							className="campaignListEdit"
						>
							Edit
						</button>
					</div>
				);
			},
		},
		// {
		// 	field: "action Delete",
		// 	headerName: "Action",
		// 	width: 150,
		// 	renderCell: (params) => {
		// 		return (
		// 			<div>
		// 				{/* <DeleteOutline
		// 					className="campaignListDelete"
		// 					onClick={() => handleDelete(params.row._id)}
		// 				/> */}
		// 			</div>
		// 		);
		// 	},
		// },
	];

	return (
		<div className="ViewContactsContainer">
			<h1> Edit {listData?.listName} </h1>
			<Container className="d-block">
				<h5>
					Details : <b>{listData?.listText}</b>
				</h5>
				<h5>
					Total Number : <b>{rowData.length}</b>
				</h5>
			</Container>
			<Container className="d-block">
				<div style={{ height: 500, width: "100%" }}>
					<DataGrid
						rows={rowData}
						columns={columns}
						pnumberSize={5}
						rowsPerPnumberOptions={[5]}
						disableSelectionOnClick
						pageSize={8}
						checkboxSelection
					/>
				</div>
			</Container>
		</div>
	);
};

export default ViewContacts;
