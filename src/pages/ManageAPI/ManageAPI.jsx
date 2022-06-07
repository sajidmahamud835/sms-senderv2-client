import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import AddNumberList from "./AddNumberList";
import "./ManageAPI.css";

const ManageAPI = () => {
	const [isSingle, setIsSingle] = useState(true);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [messageIds, setMessageIds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [manageApiData, setManageApiData] = useState({
		accountSID: "",
		authToken: "",
	});

	// const receiverNumberCollect = (e) => {
	// 	const numberString = e.target.value;
	// 	const numbers = numberString.split("\n");
	// 	manageApiData.receiver = [...numbers];
	// };

	// const handleSender = (e) => {
	// 	manageApiData.sender = e.target.value;
	// };

	const handleAccountSID = (e) => {
		manageApiData.accountSID = e.target.value;
	};
	const handleAuthToken = (e) => {
		manageApiData.authToken = e.target.value;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");
		setError("");
		fetch("http://localhost:4000/smsApi", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(manageApiData),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setIsLoading(false);
				if (data.status === 200) {
					setMessage(data.message);
					setMessageIds(data.messageIds);
					setError("");
				} else if (data.status === 400) {
					setMessage("");
					setError(data.message);
				}
			});
	};

	return (
		<section className="manageAPI m-3 p-3">
			<div className="userListTitleContainer">
				<h1 className="userTitle">Send SMS API</h1>
			</div>
			<div className="" style={{ width: "100%" }}>
				<div className="mx-4">
					{isLoading && <h4 className="text-center">Sending...</h4>}
					{message && (
						<Alert variant="success">
							<h5 className="text-center">{message}</h5>
						</Alert>
					)}
					{error && (
						<Alert variant="danger">
							<h5 className="text-center">{error}</h5>
						</Alert>
					)}
				</div>
				<form onSubmit={handleSubmit} className="px-3">
					<div className="d-flex align-items-lg-center flex-lg-row flex-column gap-lg-5 gap-md-2">
						<div className="d-flex justify-content-between align-items-center my-3 w-100">
							<label htmlFor="receiver" className="w-50">
								Account SID:
							</label>
							<input
								id="receiver"
								type="text"
								placeholder="Write your account SID..."
								className="ms-3 ps-2 form-control w-full"
								onChange={handleAccountSID}
								required
							/>
						</div>
						<div className="d-flex justify-content-between align-items-center my-3 w-100">
							<label htmlFor="receiver" className="w-50">
								Auth token:
							</label>
							<input
								id="receiver"
								type="text"
								placeholder="Write your auth token..."
								className="ms-3 ps-2 form-control w-full"
								onChange={handleAuthToken}
								required
							/>
						</div>
					</div>
					<div className="" style={{ textAlign: "right" }}>
						<button type="submit" className="btn btn-primary">
							Send Now
						</button>
					</div>
				</form>
			</div>
			<div className="" style={{ width: "100%" }}>
				<div>
					<AddNumberList /> {/* manageApiData={manageApiData} */}
				</div>
			</div>
		</section>
	);
};

export default ManageAPI;
