import { useState } from "react";
import { Alert } from "react-bootstrap";

const AddTemplates = (props) => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("")
    const [message,setMessage] = useState("")

	const { changedData, setChangedData } = props;

	const TemplateTitle = (e) => {
		const text = e.target.value;
		setTitle(text);
	};

	const TemplateMessage = (e) => {
		const message = e.target.value;
		setMessage(message);
	};
    
	const handleSubmit = (e) => {
		e.preventDefault();
		e.target.receiver.value = ""
		setIsLoading(true);
		setError("");

        const data = {
            title,
            message
        }

		fetch(`http://localhost:4000/templates`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				setChangedData(data);
				console.log(data);
				setIsLoading(false);
				if (data.status === 200) {
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
				data-bs-target="#addTemplate"
			>
				Add New Templates
			</button>

			{/* Modal */}
			<div
				className="modal fade"
				id="addTemplate"
				tabIndex="-1"
				aria-labelledby="addTemplateLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addTemplateLabel">
								Add Template
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
								<div className="d-flex justify-content-between flex-column my-3 px-2">
									<label htmlFor="receiver" className="w-50">
										Template title:
									</label>
										<input
											id="receiver"
											name="receiver"
											type="text"
											placeholder="Receiver Number..."
											className="form-control w-full mb-3"
											onChange={TemplateTitle}
											required
										/>
                                    <label htmlFor="receiver" className="w-50">
										Template Message:
									</label>
										<textarea
											id="receiver"
											type="text"
											placeholder="Receiver Number..."
											className="form-control w-full"
											onChange={TemplateMessage}
											required
										/>
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
									Add Template
								</button>
							</div>
							<div className="mx-4">
								{isLoading && (
									<h6 className="text-center">Sending to database...</h6>
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

export default AddTemplates;