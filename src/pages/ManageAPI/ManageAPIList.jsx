import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ManageAPISingleData from "../../components/ManageAPISingleData/ManageAPISingleData";
const ManageAPIList = (props) => {
	const [mobileNumberData, setMobileNumberData] = useState([]);
	const { changedData, setChangedData } = props;
	const navigate = useNavigate();
	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/smsApi/numbers`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then((res) => {
				// console.log(res.status);
				if (res.status === 403 || res.status === 401) {
					navigate('/login');
				} else {
					return res.json();
				}
			})
			.then((data) => setMobileNumberData(data));

		// console.log(changedData);
	}, [changedData, navigate]);

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
				const url = `${process.env.REACT_APP_SERVER_URL}/smsApi/numbers/${id}`;
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

		// const proceed = window.confirm("Are you sure, you want to delete?");
		// if (proceed) {
		// 	const url = `https://drone-shop-react.herokuapp.com/cart/${id}`;
		// 	fetch(url, {
		// 		method: "DELETE",
		// 	})
		// 		.then((res) => res.json())
		// 		.then((data) => {
		// 			if (data.deletedCount > 0) {
		// 				swal("Good job!", "Data delete successfully", "success");
		// 				const remainingCart = cartData.filter((cart) => cart._id !== id);
		// 				setCartData(remainingCart);
		// 			}
		// 		});
		// }
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
					{mobileNumberData?.map((mobileData) => (
						<ManageAPISingleData
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

export default ManageAPIList;
