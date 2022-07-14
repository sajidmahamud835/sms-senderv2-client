import { useEffect, useState } from "react";
import swal from "sweetalert";
import ManageTemplate from "./ManageTemplate";

const TemplateList = (props) => {
	const [templateData, setTemplateData] = useState([]);
	const { changedData, setChangedData } = props;
	useEffect(() => {
		fetch(`http://localhost:4000/templates`)
			.then((res) => res.json())
			.then((data) => setTemplateData(data));

		console.log(changedData);
	}, [changedData]);
	// delete a mobile number data
	const handleDeleteData = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const url = `http://localhost:4000/templates/${id}`;
				fetch(url, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							swal("Poof! Your data has been deleted!", {
								icon: "success",
							});
							const remainingTemplateData = templateData.filter(
								(data) => data._id !== id
							);
							setTemplateData(remainingTemplateData);
						}
					});
			} else {
				swal("Your data is safe!");
			}
		});
	};
	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Numbers</th>
						<th scope="col" className="text-end">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{templateData.map((data) => (
						<ManageTemplate
							key={data._id + data.number}
							templateData={data}
							handleDeleteData={handleDeleteData}
							mobileNumberData={templateData}
							setMobileNumberData={setTemplateData}
							changedData={changedData}
							setChangedData={setChangedData}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default TemplateList;
