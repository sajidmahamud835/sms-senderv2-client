import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";

const AddListNumber = ({
	setTargetedNumberList,
	dataChanged,
	setDataChanged,
}) => {
	const [numberListId, setNumberListId] = useState("");
	const [numberList, setNumberList] = useState([]);
	const [finalNumberData, setFinalNumberData] = useState([]);
	const { user } = UseFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/contacts/email/${user?.email}`, {
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
			.then((data) => setNumberList(data));
	}, [navigate, user.email]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/contacts/${numberListId}`, {
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
			.then((data) => setFinalNumberData(data[0].array));
	}, [navigate, numberListId, user?.email]);

	const handleNumberSubmit = () => {
		setTargetedNumberList(finalNumberData);
		setDataChanged(!dataChanged);
	};

	return (
		<>
			{/* Button trigger modal */}
			<button
				type="button"
				className="btn btn-sm btn-warning me-4"
				data-bs-toggle="modal"
				data-bs-target="#addListNumber"
			>
				Use contact list
			</button>

			{/* Modal */}
			<div
				className="modal fade"
				id="addListNumber"
				tabIndex="-1"
				aria-labelledby="addListNumberLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addListNumberLabel">
								Select Contact List
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="d-flex justify-content-between align-items-center my-3">
								<label htmlFor="receiver" className="w-50">
									Number List:
								</label>
								<select
									name="lists"
									onChange={(e) => setNumberListId(e.target.value)}
									id="cars"
									className="form-control w-50"
								>
									<option value="none">None</option>
									{numberList && (
										<>
											{numberList?.map((singleNumberList) => (
												<option
													key={singleNumberList?._id}
													value={singleNumberList?._id}
												>
													{singleNumberList?.listName}
												</option>
											))}
										</>
									)}
								</select>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={handleNumberSubmit}
								data-bs-dismiss="modal"
                id="addListNumber"
								className="btn btn-warning"
							>
								Use contact list
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddListNumber;
