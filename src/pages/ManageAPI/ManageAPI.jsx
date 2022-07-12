import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import swal from "sweetalert";
import AddNumberList from "./AddNumberList";
import "./ManageAPI.css";
import ManageAPIList from "./ManageAPIList";

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
	const [changedData, setChangedData] = useState([]);

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
		fetch(`${process.env.REACT_APP_SERVER_URL}/smsApi/${manageApiData._id}`, {
			method: "PUT",
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
					swal("Good job!", "Data added successfully...", "success");
					setMessage(data.message);
					setMessageIds(data.messageIds);
					setError("");
				} else if (data.status === 400) {
					swal("Error!", "Something is wrong...", "error");
					setMessage("");
					setError(data.message);
				}
			});
	};

	useEffect(() => {
		const url = `${process.env.REACT_APP_SERVER_URL}/smsApi`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setManageApiData(data[0]));
	}, []);

	console.log(manageApiData);

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
								defaultValue={manageApiData.accountSID}
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
								defaultValue={manageApiData.authToken}
								className="ms-3 ps-2 form-control w-full"
								onChange={handleAuthToken}
								required
							/>
						</div>
						<div className="" style={{ textAlign: "right" }}>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="mt-4">
				<div
					className="d-flex justify-content-between align-items-center"
					style={{ width: "100%" }}
				>
					<div>
						<h4 className="m-0 fw-bold">Twilio number</h4>
					</div>
					<div>
						<AddNumberList
							changedData={changedData}
							setChangedData={setChangedData}
						/>
						{/* manageApiData={manageApiData} */}
					</div>
				</div>
			</div>
			<div className="mt-4">
				<div>
					<ManageAPIList
						changedData={changedData}
						setChangedData={setChangedData}
					/>
				</div>
			</div>
			{/* <div className="mt-5 text-center">
				<div>
					<a href="/manageAPI" className="btn btn-success">
						Refresh Page
					</a>
				</div>
			</div> */}
		</section>
	);
};

export default ManageAPI;
