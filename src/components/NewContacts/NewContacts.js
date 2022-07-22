import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UseFirebase from "../../Hooks/UseFirebase";
import "./NewContacts.css";

// const columns = [
//     { field: 'id', headerName: 'ID', width: 100 },
//     {
//         field: 'name',
//         headerName: 'Name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'number',
//         headerName: 'Number',
//         type: 'number',
//         width: 200,
//         editable: true,
//     },
// ];
const NewContacts = () => {

	const navigate = useNavigate();
	const { user } = UseFirebase();
	// Code for convert csv to json
	const [array, setArray] = useState([]);
	const [listName, setListName] = useState("");
	const [listText, setListText] = useState("");
	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};

	const csvFileToArray = (string) => {
		const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");
		const CSVArray = csvRows?.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});

			return obj;
		});
		setArray(CSVArray);
	};
	const ListName = (e) => {
		setListName(e.target.value);
	};

	const ListText = (e) => {
		setListText(e.target.value);
	};

	const NewListMake = (e) => {
		e.preventDefault();
		const email = user.email;
		const listData = { listName, email, listText, array };

		const url = `${process.env.REACT_APP_SERVER_URL}/contacts`;
		fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(listData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.insertedId) {
					swal({
						title: "Are you sure?",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((willAdd) => {
						if (willAdd) {
							swal("List is added", {
								icon: "success",
							});
							navigate("/contacts");
						} else {
							swal("Your imaginary file is safe!");
						}
					});
				}
			});
	};

	const GoTOAllLIst = () => {
		navigate("/contacts");
	};

	return (
		<div className="NewContactsContainer">
			{/* Drop Box Code Start here*/}

			{/* Drop Box Code End */}
			<div className="card shadow px-5 py-4 my-5 w-75 mx-auto">
				<div className="d-flex justify-content-between">
					<h1 className="m-0">Create Contacts </h1>
					<button onClick={GoTOAllLIst} className="btn btn-success px-2 m-0">
						All List
					</button>
				</div>
				<div className="d-flex flex-column align-items-center">
					<form onSubmit={NewListMake}>
						<div className="d-flex mt-5 justify-content-between">
							<label className="m-0">Name :</label>
							<input
								required
								onBlur={ListName}
								type="text"
								placeholder="List name"
								className="w-50 form-control"
							/>
						</div>
						<div className="d-flex mt-4 justify-content-between">
							<label className="m-0">Description :</label>
							<textarea
								onBlur={ListText}
								name="listDescription"
								className="form-control w-50"
								style={{ height: 100 }}
							></textarea>
						</div>
						<div className="d-flex align-items-center justify-content-between flex-row mt-4">
							<h6 className="m-0">Upload File (CSV) :</h6>
							<input
								className="form-control w-50"
								required
								type={"file"}
								id={"csvFileInput"}
								accept={".csv"}
								onChange={handleOnChange}
							/>
						</div>
						<div className="text-end">
							<button type="submit" className="btn btn-primary mt-4">
								Create List
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* <br /> */}

			{/* <DataGrid
                rows={csvFile}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[25]}
                checkboxSelection
                disableSelectionOnClick
            /> */}
		</div>
	);
};

export default NewContacts;
