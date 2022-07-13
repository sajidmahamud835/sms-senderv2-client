import { useEffect, useState } from "react";
import swal from "sweetalert";
import ManageTemplate from "./ManageTemplate";

const TemplateList = (props) => {
	const [mobileNumberData, setMobileNumberData] = useState([]);
	const { changedData, setChangedData } = props;
	useEffect(() => {
		fetch(`http://localhost:4000/templates`)
			.then((res) => res.json())
			.then((data) => setMobileNumberData(data));

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
							const remainingMobileNumberData = mobileNumberData.filter(
								(data) => data._id !== id
							);
							setMobileNumberData(remainingMobileNumberData);
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
					{mobileNumberData.map((mobileData) => (
						<ManageTemplate
							key={mobileData._id + mobileData.number}
							mobileData={mobileData}
							handleDeleteData={handleDeleteData}
							mobileNumberData={mobileNumberData}
							setMobileNumberData={setMobileNumberData}
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
