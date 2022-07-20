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
	const [userData, setUserData] = useState({});
	const [smallLoading, setSmallLoading] = useState(false);

	useEffect(() => {
		setInputFieldData({
			...inputFieldData,
			email: user?.email,
		});
	}, [user?.email]);

	useEffect(() => {
		if (!loading) {
			const url = `${process.env.REACT_APP_SERVER_URL}/users/email/${user.email}`;
			fetch(url, {
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
				.then((data) => {
					if (data) {
						setUserData(data[0]);
					} else {
						navigate('/login');
					}
				});
		}
	}, [loading, user.email, navigate]);

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
		const imageStorageKey = process.env.REACT_APP_IMAGE_STORAGE_KEY;
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

	useEffect(() => {
		if (!loading) {
			//check all feild of userData is not empty
			if (userData.userName && userData.displayName && userData.mobileNumber && userData.address && userData.imageUrl) {
				navigate('/');
			}
		}
	}, [loading, userData, navigate]);



	return (
		<LayOut>
			{user ?
				<>
					<div className="user">
						<div className="userTitleContainer">
							<h1 className="userTitle">Update Your Profile</h1>
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
													defaultValue={userData.userName}
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
													defaultValue={userData.displayName}
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
													defaultValue={userData.mobileNumber}
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
													defaultValue={userData.address}
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
														src={image ? image : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"}
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