import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";

const SingleAdmin = (props) => {
	const [isEdit, setIsEdit] = useState(false);
	const [changedData, setChangedData] = useState({});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { handleDeleteData, dataChanged, setDataChanged } = props;
	const { _id, email } = props.singleAdminData;

	const EditButton = () => {
		if (isEdit) {
			setIsEdit(false);
		} else {
			setIsEdit(true);
		}
	};

	const handleNumberChange = (e) => {
		const updatedEmail = e.target.value;
		const updatedData = { email: updatedEmail };
		setChangedData(updatedData);
	};

	// update admin email
	const saveChange = (e) => {
		e.preventDefault();
		const url = `http://localhost:4000/admins/${_id}`;
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
					<td style={{ paddingTop: 11 }}>
						<form onSubmit={saveChange}>
							{!isEdit ? (
								<span className="fs-5">{email}</span>
							) : (
								<div className="d-flex">
									<input
										type="email"
										defaultValue={email}
										onBlur={handleNumberChange}
										className="form-control w-50"
										required
									/>
									<div>
										<button className="btn btn-primary ms-2" type="submit">
											Save
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
							onClick={() => handleDeleteData(_id)}
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
