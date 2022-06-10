import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import swal from "sweetalert";

const ManageAPIList = () => {
	const [mobileNumberData, setMobileNumberData] = useState([]);
	useEffect(() => {
		fetch(`http://localhost:4000/smsApi/numbers`)
			.then((res) => res.json())
			.then((data) => setMobileNumberData(data));
	}, []);
	console.log(mobileNumberData);

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
				const url = `http://localhost:4000/smsApi/numbers/${id}`;
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
					{mobileNumberData.map((mobileData) => (
						<tr className="" key={mobileData._id}>
							<th scope="row" className="fs-6 pt-3">
								{mobileData.number}
							</th>
							<td className="text-end">
								<button className="btn btn-info">
									<FiEdit />
								</button>
								<button
									className="btn btn-danger ms-3"
									onClick={() => handleDeleteData(mobileData._id)}
								>
									<AiOutlineDelete />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ManageAPIList;
