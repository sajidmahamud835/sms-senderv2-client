import { useState } from "react";
import { Alert } from "react-bootstrap";

const AddNumberList = () => {
	// { manageApiData }

	const [isSingle, setIsSingle] = useState(true);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [messageIds, setMessageIds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [manageMobileData, setManageMobileData] = useState({
		twilioNumbers: [],
	});

	const receiverNumberCollect = (e) => {
		const numberString = e.target.value;
		const numbers = numberString.split("\n");
		manageMobileData.twilioNumbers = [...numbers];
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");
		setError("");
		fetch("http://localhost:4000/smsApi/numbers", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(manageMobileData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
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
		<>
			{/* Button trigger modal */}
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				Add Mobile Number
			</button>

			{/* Modal */}
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add Mobile Number
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="modal-body">
								<div className="d-flex justify-content-between align-items-center my-3">
									<label htmlFor="receiver" className="w-50">
										Mobile Number:
									</label>
									{isSingle ? (
										<input
											id="receiver"
											type="text"
											placeholder="Receiver Number..."
											className="ms-3 ps-2 form-control w-full"
											onChange={receiverNumberCollect}
											required
										/>
									) : (
										<textarea
											id="receiver"
											type="text"
											placeholder="Receiver Number..."
											className="ms-3 ps-2 form-control w-full"
											onChange={receiverNumberCollect}
											required
										/>
									)}
								</div>
								<div className="d-flex align-items-center justify-content-between my-3">
									<div></div>
									<div className="d-flex">
										<div className="form-check me-3">
											<input
												className="form-check-input radio"
												type="radio"
												value=""
												id="flexCheckChecked"
												name="numberRequired"
												onClick={() => setIsSingle(true)}
											/>
											<label
												className="form-check-label"
												htmlFor="flexCheckChecked"
											>
												Single
											</label>
										</div>
										<div className="form-check ms-3">
											<input
												className="form-check-input radio"
												type="radio"
												value=""
												id="flexCheckDefault"
												name="numberRequired"
												onClick={() => setIsSingle(false)}
											/>
											<label
												className="form-check-label"
												htmlFor="flexCheckDefault"
											>
												Bulk
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="submit" className="btn btn-primary">
									Add Numbers
								</button>
							</div>
							<div className="mx-4">
								{isLoading && (
									<h6 className="text-center">Sending to database...</h6>
								)}
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
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNumberList;
