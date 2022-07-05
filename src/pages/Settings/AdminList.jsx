import React from "react";
import swal from "sweetalert";
import SingleAdmin from "./SingleAdmin";

const AdminList = (props) => {
	const { adminData, setAdminData, dataChanged, setDataChanged } = props;

	// delete a admin
	const handleDeleteData = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const url = `http://localhost:4000/admins/${id}`;
				fetch(url, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							swal("Poof! Your data has been deleted!", {
								icon: "success",
							});
							const remainAdminData = adminData.filter(
								(data) => data._id !== id
							);
							setAdminData(remainAdminData);
						}
					});
			} else {
				swal("Your data is safe!");
			}
		});
	};

	return (
		<>
			<table className="table table-hover mx-auto">
				<thead>
					<tr>
						<th scope="col">Email Address</th>
						<th scope="col" className="text-end">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{adminData.map((singleAdminData) => (
						<SingleAdmin
							key={singleAdminData._id}
							singleAdminData={singleAdminData}
							handleDeleteData={handleDeleteData}
							dataChanged={dataChanged}
							setDataChanged={setDataChanged}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default AdminList;