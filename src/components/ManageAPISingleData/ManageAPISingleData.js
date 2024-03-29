import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import swal from "sweetalert";

const ManageAPISingleData = (props) => {
	const { _id, number } = props.mobileData;
	const { handleDeleteData, setChangedData, changedData } = props;
	const [isEdit, setIsEdit] = useState(false);
	const [changedNumber, setChangedNumber] = useState({});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [messageIds, setMessageIds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const EditButton = () => {
		if (isEdit) {
			setIsEdit(false);
		} else {
			setIsEdit(true);
		}
	};

	const handleNumberChange = (e) => {
		const changedNumber = e.target.value;
		const updatedNumber = { number: changedNumber };
		setChangedNumber(updatedNumber);
	};

	const saveChange = (e) => {
		e.preventDefault();
		const url = `${process.env.REACT_APP_SERVER_URL}/smsApi/numbers/${_id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(changedNumber),
		})
			.then((res) => res.json())
			.then((data) => {
				setChangedData(data.data);
				setIsLoading(false);
				if (data.status === 200) {
					swal("Good job!", "Data added successfully...", "success");
					setMessage(data.message);
					setMessageIds(data.messageIds);
					setError("");
				} else if (data.status === 400) {
					swal("Error!", "Something is wrong...", "danger");
					setMessage("");
					setError(data.message);
				}
			});

		console.log("saved", changedNumber);
	};

	return (
		<>
			<tr className="" key={_id}>
				<th scope="row" className="fs-6 pt-3">
					<form onSubmit={saveChange}>
						{!isEdit ? (
							<span>{number}</span>
						) : (
							<div className="d-flex">
								<input
									type="text"
									defaultValue={number}
									onBlur={handleNumberChange}
									className="form-control w-50"
								/>
								<div>
									<button className="btn btn-primary ms-2" type="submit">
										Save
									</button>
								</div>
							</div>
						)}
					</form>
				</th>
				<td className="text-end">
					<button className="btn btn-primary" onClick={EditButton}>
						<FiEdit />
					</button>
					<button
						className="btn btn-danger ms-3"
						onClick={() => handleDeleteData(_id)}
					>
						<AiOutlineDelete />
					</button>
				</td>
			</tr>
		</>
	);
};

export default ManageAPISingleData;
