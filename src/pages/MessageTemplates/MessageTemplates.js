import { useState } from "react";
import "../ManageAPI/ManageAPI.css";
import AddTemplates from "./AddTemplates";
import TemplateList from "./TemplateList";

const MessageTemplates = () => {
	const [changedData, setChangedData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	return (
		<section className="manageAPI m-3 p-3">
			<div className="userListTitleContainer">
				<h1 className="userTitle">Message Templates</h1>
			</div>
			<div className="" style={{ width: "100%" }}></div>
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
							isLoading={isLoading}
							setIsLoading={setIsLoading}
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
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
		</section>
	);
};

export default MessageTemplates;
