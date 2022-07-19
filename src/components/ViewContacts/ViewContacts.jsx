import { Container } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../ViewContacts/ViewContacts.css";

const columns = [
	{
		field: "id",
		headerName: "ID",
		width: 70
	},
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
	}
];

const ViewContacts = () => {
	let { Id } = useParams();
	const [listData, setListData] = useState({});
	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/contacts/${Id}`)
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