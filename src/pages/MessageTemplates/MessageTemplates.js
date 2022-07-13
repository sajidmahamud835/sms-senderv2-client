import { useState } from "react";
import { Alert } from "react-bootstrap";
import "../ManageAPI/ManageAPI.css";
import ManageAPIList from "../ManageAPI/ManageAPIList";
import AddTemplates from "./AddTemplates";
import TemplateList from "./TemplateList";

const MessageTemplates = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [changedData, setChangedData] = useState([]);

	return (
		<section className="manageAPI m-3 p-3">
			<div className="userListTitleContainer">
				<h1 className="userTitle">Message Templates</h1>
			</div>
			<div className="" style={{ width: "100%" }}>
				<div className="mx-4">
					{isLoading && <h4 className="text-center">Sending...</h4>}
					{error && (
						<Alert variant="danger">
							<h5 className="text-center">{error}</h5>
						</Alert>
					)}
				</div>
			</div>
			<div className="mt-4">
				<div
					className="d-flex justify-content-between align-items-center"
					style={{ width: "100%" }}
				>
					<div>
						<h4 className="m-0 fw-bold">Templates</h4>
					</div>
					<div>
						<AddTemplates
							changedData={changedData}
							setChangedData={setChangedData}
						/>
						{/* manageApiData={manageApiData} */}
					</div>
				</div>
			</div>
			<div className="mt-4">
				<div>
					<TemplateList
						changedData={changedData}
						setChangedData={setChangedData}
					/>
				</div>
			</div>
		</section>
	);
};

export default MessageTemplates;
