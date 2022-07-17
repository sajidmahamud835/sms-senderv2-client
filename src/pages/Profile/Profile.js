import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import UseFirebase from "../../Hooks/UseFirebase";
import { Grid } from "@material-ui/core";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { user, loading } = UseFirebase();
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [dataChanged, setDataChanged] = useState(true);
	const navigate = useNavigate();
	const [inputFieldData, setInputFieldData] = useState({});
	const [smallLoading, setSmallLoading] = useState(false);
	const [image, setImage] = useState(false);

	useEffect(() => {
		if (!loading) {
			const url = `${process.env.REACT_APP_SERVER_URL}/users/email/${user.email}`;
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
						setUserData(data[0]);
						setIsLoading(false);
					} else {
						navigate('/login');
					}
				});
		}
	}, [loading, user.email, dataChanged, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `${process.env.REACT_APP_SERVER_URL}/users/${userData._id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(inputFieldData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data) {
					toast.success("Data updated!");
				}
				setIsLoading(false);
				setDataChanged(!dataChanged);
			});
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
		<>
			<div className="user">
				<div className="userTitleContainer">
					<h1 className="userTitle">Edit Profile</h1>
				</div>
				{isLoading && (
					<>
						<span className="d-flex justify-content-center align-items-center h-25">
							Loading...
						</span>
					</>
				)}
				{!isLoading && (
					<div className="userContainer">
						<Grid container spacing={2}>
							<Grid item md={12} lg={5} style={{ width: "100%" }}>
								<div className="userShow">
									<div className="userShowTop">

										<img
											src={userData.imageUrl}
											alt={userData.displayName}
											className="userShowImg"
										/>

										<div className="userShowTopTitle">
											<span className="userShowUsername">
												{userData.displayName}
											</span>
											<span className="userShowUserTitle">User</span>
										</div>
									</div>
									<div className="userShowBottom">
										<span className="userShowTitle">Account Details</span>
										{userData.userName &&
											<div className="userShowInfo">
												<PermIdentity className="userShowIcon" />
												<span className="userShowInfoTitle">{userData.userName}</span>
											</div>
										}
										{userData.accountCreated && (
											<div className="userShowInfo">
												<CalendarToday className="userShowIcon" />
												<span className="userShowInfoTitle">
													{userData.accountCreated}
												</span>
											</div>
										)}
										<span className="userShowTitle">Contact Details</span>
										{userData.mobileNumber &&
											<div className="userShowInfo">
												<PhoneAndroid className="userShowIcon" />
												<span className="userShowInfoTitle">
													{userData.mobileNumber}
												</span>
											</div>
										}
										<div className="userShowInfo">
											<MailOutline className="userShowIcon" />
											<span className="userShowInfoTitle">{userData.email}</span>
										</div>
										{userData.address &&
											<div className="userShowInfo">
												<LocationSearching className="userShowIcon" />
												<span className="userShowInfoTitle">{userData.address}</span>
											</div>
										}
									</div>
								</div>
							</Grid>
							<Grid item md={12} lg={7} style={{ width: "100%" }}>
								<div className="userUpdate">
									<span className="userUpdateTitle">Edit</span>
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
													defaultValue={userData.email}
													className="userUpdateInput"
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
							</Grid>
						</Grid>

					</div>
				)}
			</div>
		</>
	);
};

export default Profile;