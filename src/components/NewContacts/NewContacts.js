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
var xlsx = require('xlsx');

const NewContacts = () => {

	const navigate = useNavigate();
	const { user } = UseFirebase();
	// Code for convert csv to json
	const [array, setArray] = useState([]);
	const [listName, setListName] = useState("");
	const [listText, setListText] = useState("");

	const [showCSVUpload, setShowCSVUpload] = useState(false)
	const [showTextUpload, setShowTextUpload] = useState(false)
	const [showExcelUpload, setShowExcelUpload] = useState(false)

	const fileReader = new FileReader();

	const handleOnCSVChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};
	const handleOnExcelChange = (e) => {
		e.preventDefault();
		if (e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = xlsx.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);
				// json.forEach(function (v) { delete v.number });
				console.log(json);
			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	};
	const handleOnTextChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				textFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};
	const textAreaOnChange = (e) => {
		textFileToArray(e.target.value);
	}
	const textFileToArray = (string) => {
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
		console.log(CSVArray)
	}

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
							<h6 className="m-0">Upload File :</h6>
							<div className="d-flex ps-4">
								<div className="form-check me-3">
									<input
										className="form-check-input radio"
										type="radio"
										value=""
										id="flexCheckChecked"
										name="numberRequired"
										onClick={() => {
											setShowCSVUpload(true)
											setShowExcelUpload(false)
											setShowTextUpload(false)
										}}
									/>
									<label className="form-check-label" htmlFor="flexCheckChecked">
										csv
									</label>
								</div>
								<div className="form-check ms-3">
									<input
										className="form-check-input radio"
										type="radio"
										value=""
										id="flexCheckDefault"
										name="numberRequired"
										onClick={() => {
											setShowCSVUpload(false)
											setShowExcelUpload(true)
											setShowTextUpload(false)
										}}
									/>
									<label className="form-check-label" htmlFor="flexCheckDefault">
										excel
									</label>
								</div>
								<div className="form-check ms-3">
									<input
										className="form-check-input radio"
										type="radio"
										value=""
										id="flexCheckDefault"
										name="numberRequired"
										onClick={() => {
											setShowCSVUpload(false)
											setShowExcelUpload(false)
											setShowTextUpload(true)
										}}
									/>
									<label className="form-check-label" htmlFor="flexCheckDefault">
										text
									</label>
								</div>
							</div>

						</div>
						<div>
							{
								showCSVUpload && <div className="mt-5">
									<input
										className="form-control w-100"
										required
										type={"file"}
										id={"csvFileInput"}
										accept={".csv"}
										onChange={handleOnCSVChange}
									/>
								</div>
							}
							{
								showExcelUpload && <div className="mt-5">
									<input
										className="form-control w-100"
										type="file"
										name="upload"
										id="upload"
										onChange={handleOnExcelChange}
									/>
								</div>
							}
							{
								showTextUpload && <div className="mt-5">
									<textarea onBlur={textAreaOnChange} name="pls write here number and name" id="" cols="38" rows="3"></textarea>
									<h6 className="text-center">OR</h6>
									<input
										className="form-control w-100"
										type="file"
										name="upload"
										id="upload"
										onChange={handleOnTextChange}
									/>
								</div>
							}
						</div>

						<div className="text-end">
							<button type="submit" className="btn btn-primary mt-4">
								Create List
							</button>
						</div>
					</form>
				</div>
			</div >

			{/* <br /> */}

			{/* <DataGrid
                rows={csvFile}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[25]}
                checkboxSelection
                disableSelectionOnClick
            /> */}
		</div >
	);
};

export default NewContacts;
