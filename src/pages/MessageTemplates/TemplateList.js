import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ManageTemplate from "./ManageTemplate";
import UseFirebase from "../../Hooks/UseFirebase";

const TemplateList = (props) => {
	const [templateData, setTemplateData] = useState([]);
	const { changedData, setChangedData } = props;
	const navigate = useNavigate();
	const { user, loading, admin } = UseFirebase();

	useEffect(() => {
		if (!loading) {
			const url = `${process.env.REACT_APP_SERVER_URL}/templates/${user.email}`;
			fetch(url, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
				.then((res) => {
					console.log(res.status);
					if (res.status === 403 || res.status === 401) {
						navigate('/login');
					} else {
						return res.json();
					}
				})
				.then((data) => {
					if (data) {
						setTemplateData(data.templates);
					} else {
						navigate('/login');
					}
				});
		}
	}, [loading, user.email, changedData, navigate]);

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
				const url = `${process.env.REACT_APP_SERVER_URL}/templates/${id}`;
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
						<th scope="col">Template</th>
						<th scope="col" className="text-end">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{templateData?.map((data) => (
						<ManageTemplate
							key={data._id + data.number}
							templateData={data}
							handleDeleteData={handleDeleteData}
							allTemplateData={templateData}
							setMobileNumberData={setTemplateData}
							changedData={changedData}
							setChangedData={setChangedData}
							admin={admin}

						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default TemplateList;
