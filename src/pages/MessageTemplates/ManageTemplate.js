import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import swal from "sweetalert";
import { toast } from 'react-toastify';

const ManageTemplate = (props) => {
	const { _id, title, message: templateMessage, email } = props.templateData;
	const { handleDeleteData, setChangedData, changedData, admin } = props;
	const [isEdit, setIsEdit] = useState(false);
	const [changedTitle, setChangedTitle] = useState(title);
	const [changedMessage, setChangedMessage] = useState(templateMessage);
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
	console.log(isEdit);

	const handleTitleChange = (e) => {
		const changedTitle = e.target.value;
		setChangedTitle(changedTitle);
	};
	const handleMessageChange = (e) => {
		const changedMessage = e.target.value;
		setChangedMessage(changedMessage);
	};

	const saveChange = (e) => {
		e.preventDefault();
		setIsEdit(false);
		const updatedData = {
			title: changedTitle,
			message: changedMessage
		};

		const url = `${process.env.REACT_APP_SERVER_URL}/templates/${_id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.data) {
					toast.success("Data updated!");
				}
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

		console.log("saved", updatedData);
	};

	return (
		<>
			<tr className="" key={_id}>
				<th scope="row" className="fs-6 pt-3">
					<form onSubmit={saveChange}>
						{!isEdit ? (
							<span>{title} {admin && <span>({email})</span>}</span>
						) : (
							<div className="d-flex">
								<input
									type="text"
									defaultValue={title}
									onBlur={handleTitleChange}
									className="form-control w-50"
								/>
								<textarea
									id="receiver"
									type="text"
									className="form-control w-50"
									defaultValue={templateMessage}
									onBlur={handleMessageChange}
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

export default ManageTemplate;
