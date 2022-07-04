import { Container } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../EditAllList/EditAllList.css";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{
		field: "mobile",
		headerName: "Number",
		type: "number",
		width: 120,
	},
	{
		field: "name",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 260,
		// valueGetter: (params) =>
		// 	`${params.row.firstName || ""} ${params.row.lastName || ""}`,
	},
];

// const rows = [
// 	{ id: 1, lastName: "Snow", firstName: "Jon", number: 35 },
// 	{ id: 2, lastName: "Lannister", firstName: "Cersei", number: 42 },
// 	{ id: 3, lastName: "Lannister", firstName: "Jaime", number: 45 },
// 	{ id: 4, lastName: "Stark", firstName: "Arya", number: 16 },
// 	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", number: null },
// 	{ id: 6, lastName: "Melisandre", firstName: null, number: 150 },
// 	{ id: 7, lastName: "Clifford", firstName: "Ferrara", number: 44 },
// 	{ id: 8, lastName: "Frances", firstName: "Rossini", number: 36 },
// 	{ id: 9, lastName: "Roxie", firstName: "Harvey", number: 65 },
// ];

const EditAllList02 = () => {
	let { Id } = useParams();
	const [listData, setListData] = useState({});
	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:4000/excel-file/${Id}`)
			.then((res) => res.json())
			.then((data) => setListData(data[0]));
	}, [Id]);

	useEffect(() => {
		// setRowData(listData?.array);
		if (listData.array) {
			setRowData(listData.array);
		}
	}, [listData]);
 

	return (
		<div className="EditAllListContainer">
			<h1> Edit List</h1>
			<Container className="d-block">
				<h3>
					Name : <b>{listData?.listName}</b>
				</h3>
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

export default EditAllList02;
