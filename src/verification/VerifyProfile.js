import React, { useEffect, useState } from 'react';
import LayOut from '../components/LayOut/LayOut';
import { Publish } from "@material-ui/icons";
import "../pages/Profile/Profile.css";
import UseFirebase from '../Hooks/UseFirebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyProfile = () => {
	const { user, loading } = UseFirebase();
	const navigate = useNavigate("");
	const [error, setError] = useState(false);
	const [image, setImage] = useState(false);
	const [inputFieldData, setInputFieldData] = useState({});
	const [smallLoading, setSmallLoading] = useState(false);
	useEffect(() => {
		setInputFieldData({
			...inputFieldData,
			email: user?.email,
		});
	}, [user?.email]);

	useEffect(() => {
		const { userName, displayName, mobileNumber, address } = inputFieldData;
		if (!userName || userName === "" || !displayName || displayName === "" || !mobileNumber || mobileNumber === "" || !address || address === "") {
			setError("Please fill in the form");
		} else if (!image) {
			setError("Please upload your image");
		} else {
			setError(false);
		}
	}, [image, inputFieldData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setInputFieldData({
			...inputFieldData
		});

		const url = `${process.env.REACT_APP_SERVER_URL}/users/complete`;
		if (!error) {
			console.log(inputFieldData);
			fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(inputFieldData),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					navigate('/');
				});
		}
	};

	const handleImageChange = (e) => {
		const image = e.target.files[0];
		const imageStorageKey = '8e83d1fae7e6eac6ba7c1112bd135e2e';
		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
		if (image)
			setSmallLoading(true);
		fetch(url, {
			method: "POST",
			body: formData
		})
			.then(res => res.json())
			.then(data => {
				if (data) {
					setImage(data.data.url);
					setSmallLoading(false);
					toast.success("Image updated");
					setInputFieldData({
						...inputFieldData,
						imageUrl: data.data.url,
					});
				} else {
					console.log("something went wrong");
				}
			});
	};

	return (
		<LayOut>
			{user ?
				<>
					<div className="user">
						<div className="userTitleContainer">
							<h1 className="userTitle">Edit Profile</h1>
						</div>
						{loading && (
							<>
								<span className="d-flex justify-content-center align-items-center h-25">
									Loading...
								</span>
							</>
						)}
						{!loading && (
							<div className="userContainer d-flex justify-content-center align-item-center">
								<div className="userUpdate" style={{ maxWidth: '700px' }}>
									<span className="userUpdateTitle">Edit</span>
									{error && <p className="text-danger">{error}</p>}
									<form onSubmit={handleSubmit} className="userUpdateForm">
										<div className="userUpdateLeft">
											<div className="userUpdateItem">
												<label>Username</label>
												<input
													type="text"
													onChange={(e) =>
														setInputFieldData({
															...inputFieldData,
															userName: e.target.value,
														})
													}
													className="userUpdateInput"
												/>
											</div>
											<div className="userUpdateItem">
												<label>Full Name</label>
												<input
													type="text"
													onChange={(e) =>
														setInputFieldData({
															...inputFieldData,
															displayName: e.target.value,
														})
													}
													className="userUpdateInput"
												/>
											</div>
											<div className="userUpdateItem">
												<label>Email</label>
												<input
													type="text"
													className="userUpdateInput"
													value={user?.email}
													readOnly
												/>
											</div>
											<div className="userUpdateItem">
												<label>Phone</label>
												<input
													type="text"
													onChange={(e) =>
														setInputFieldData({
															...inputFieldData,
															mobileNumber: e.target.value,
														})
													}
													className="userUpdateInput"
												/>
											</div>
											<div className="userUpdateItem">
												<label>Address</label>
												<input
													type="text"
													onChange={(e) =>
														setInputFieldData({
															...inputFieldData,
															address: e.target.value,
														})
													}
													className="userUpdateInput"
												/>
											</div>
										</div>
										<div className="userUpdateRight">
											<div className="userUpdateUpload">
												<div>
													{smallLoading ? "Loading" : <img
														className="userUpdateImg"
														src={image ? image : "https://via.placeholder.com/350x150"}
														alt="placeholder"
													/>}
													<label htmlFor="file">
														<Publish className="userUpdateIcon" />
													</label>
													<input
														className="userUpdateInput"
														type="file" id="file" style={{ display: "none" }}
														onChange={handleImageChange}
													/>
												</div>
											</div>
											<button type="submit" className="userUpdateButton">
												Update
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
				</>
				: <p>No user found</p>}
		</LayOut>
	);
};

export default VerifyProfile;