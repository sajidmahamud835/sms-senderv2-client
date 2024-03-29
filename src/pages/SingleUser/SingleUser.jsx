import {
	CalendarToday,
	LocationSearching,
	MailOutline,
	PermIdentity,
	PhoneAndroid,
	Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SingleUser.css";
import { toast } from 'react-toastify';

const User = () => {
	const [userData, setUserData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dataChanged, setDataChanged] = useState(true);
	const { userId } = useParams();

	const [inputFieldData, setInputFieldData] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const url = `${process.env.REACT_APP_SERVER_URL}/users/${userId}`;
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
				setUserData(data[0]);
				setIsLoading(false);
			});
	}, [userId, dataChanged, navigate]);

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
				if (data) {
					toast.success("Data updated!");
				}
				console.log(data);
				setIsLoading(false);
				setDataChanged(!dataChanged);
			});
	};

	return (
		<>
			<div className="user">
				<div className="userTitleContainer">
					<h1 className="userTitle">Edit User</h1>
					<Link to="/newUser">
						<button className="userAddButton">Create</button>
					</Link>
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
									<span className="userShowUserTitle">Software Engineer</span>
								</div>
							</div>
							<div className="userShowBottom">
								<span className="userShowTitle">Account Details</span>
								<div className="userShowInfo">
									<PermIdentity className="userShowIcon" />
									<span className="userShowInfoTitle">{userData.userName}</span>
								</div>
								{userData.accountCreated && (
									<div className="userShowInfo">
										<CalendarToday className="userShowIcon" />
										<span className="userShowInfoTitle">
											{userData.accountCreated}
										</span>
									</div>
								)}
								<span className="userShowTitle">Contact Details</span>
								<div className="userShowInfo">
									<PhoneAndroid className="userShowIcon" />
									<span className="userShowInfoTitle">
										{userData.mobileNumber}
									</span>
								</div>
								<div className="userShowInfo">
									<MailOutline className="userShowIcon" />
									<span className="userShowInfoTitle">{userData.email}</span>
								</div>
								<div className="userShowInfo">
									<LocationSearching className="userShowIcon" />
									<span className="userShowInfoTitle">{userData.address}</span>
								</div>
							</div>
						</div>
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
											disabled
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
									<div className="userUpdateItem">
										<label>Active User?</label>
										<select
											className="newUserSelect"
											name="active"
											id="active"
											defaultValue={userData.isActiveUser}
											onChange={(e) =>
												setInputFieldData({
													...inputFieldData,
													isActiveUser: e.target.value,
												})
											}
											required
										>
											<option value="yes">Yes</option>
											<option value="no">No</option>
										</select>
									</div>
								</div>
								<div className="userUpdateRight">
									<div className="userUpdateUpload">
										<img
											className="userUpdateImg"
											src={userData.imageUrl}
											alt={userData.displayName}
										/>
										<label htmlFor="file">
											<Publish className="userUpdateIcon" />
										</label>
										<input type="file" id="file" style={{ display: "none" }} />
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
	);
};

export default User;