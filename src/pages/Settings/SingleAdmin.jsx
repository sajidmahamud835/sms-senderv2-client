import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";
import { toast } from 'react-toastify';

const SingleAdmin = (props) => {
	const [isEdit, setIsEdit] = useState(false);
	const [changedData, setChangedData] = useState({});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { handleDeleteData, dataChanged, setDataChanged } = props;
	const { email, displayName, position } = props.singleAdminData;

	const EditButton = () => {
		if (isEdit) {
			setIsEdit(false);
		} else {
			setIsEdit(true);
		}
	};

	const handleNumberChange = (e) => {
		const updatedPosition = e.target.value;
		const updatedData = { position: updatedPosition };
		setChangedData(updatedData);
	};

	// update admin email
	const saveChange = (e) => {
		e.preventDefault();
		const url = `${process.env.REACT_APP_SERVER_URL}/admins/${email}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(changedData),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsEdit(false);
				if (data) {
					toast.success("Data updated!");
				}
				setChangedData(data.data);
				setDataChanged(!dataChanged);
				setIsLoading(false);
				if (data.status === 200) {
					swal("Good job!", "Data added successfully...", "success");
					setMessage(data.message);
					setError("");
				} else if (data.status === 400) {
					swal("Error!", "Something is wrong...", "danger");
					setMessage("");
					setError(data.message);
				}
			});
	};

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<tr>
					<td className="fs-5">{displayName}</td>
					<td className="fs-5">{email}</td>
					<td style={{ paddingTop: 11 }}>
						<form onSubmit={saveChange}>
							{!isEdit ? (
								<span className="fs-5">{position}</span>
							) : (
								<div className="d-flex">
									<input
										type="text"
										defaultValue={position}
										onBlur={handleNumberChange}
										className="form-control w-50"
										required
									/>
									<div>
										<button className="btn btn-primary ms-2" type="submit">
											Update
										</button>
									</div>
								</div>
							)}
						</form>
					</td>
					<td className="text-end">
						<button onClick={EditButton} className="btn btn-primary">
							<FiEdit />
						</button>
						<button
							className="btn btn-danger ms-2"
							onClick={() => handleDeleteData(email)}
						>
							<AiOutlineDelete />
						</button>
					</td>
				</tr>
			)}
		</>
	);
};

export default SingleAdmin;
