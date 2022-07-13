import React,{ useEffect, useState } from 'react';
import LayOut from '../components/LayOut/LayOut';
import {  Publish } from "@material-ui/icons";
import "../pages/Profile/Profile.css";
import UseFirebase from '../Hooks/UseFirebase';
import { useNavigate } from 'react-router-dom';

const VerifyProfile = () => {
    const { user, loading } = UseFirebase();
    const navigate = useNavigate("")

	const [error, setError] = useState(false);
	const [inputFieldData, setInputFieldData] = useState({});
    useEffect(() => {
        setInputFieldData({
            ...inputFieldData,
            email: user?.email,
        })
    }, [user?.email])
	const handleSubmit = (e) => {
		e.preventDefault();
		setInputFieldData({
            ...inputFieldData,
            imageUrl: "https://via.placeholder.com/350x150",
        })
		const {userName,displayName, mobileNumber,address} = inputFieldData;
		if(!userName || !displayName || !mobileNumber || !address){
			setError("Please fill in the form")
		} else {
			setError(false)
		}
		const url = `http://localhost:4000/users`;
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
                navigate('/')
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
								{/* <Grid container spacing={2}>
									<Grid item md={12} lg={7} style={{ width: "100%" }}> */}
										<div className="userUpdate" style={{maxWidth: '700px'}}>
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
                                                                    <img
                                                                        className="userUpdateImg"
                                                                        src="https://via.placeholder.com/350x150"
                                                                        alt="placeholder"
                                                                    />
																<label htmlFor="file">
																	<Publish className="userUpdateIcon" />
																</label>
																<input
																className="userUpdateInput"
																 type="file" id="file" style={{ display: "none" }} />
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