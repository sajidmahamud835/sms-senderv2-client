import React, { useEffect, useState } from "react";
import "./Settings.css";
import { Alert } from "react-bootstrap";
import swal from "sweetalert";
import AdminList from "./AdminList";
import { useNavigate } from "react-router-dom";

const Settings = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [adminData, setAdminData] = useState([]);

	const [dataChanged, setDataChanged] = useState(true);
	const adminEmail = {
		email: "",
		role: "admin",
	};

	const navigate = useNavigate();

	// handle admin email
	const handleAdminEmail = (e) => {
		adminEmail.email = e.target.value;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");
		setError("");
		fetch(`${process.env.REACT_APP_SERVER_URL}/admins`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(adminEmail),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setDataChanged(!dataChanged);
				if (data.status === 200) {
					swal("Good job!", "Data added successfully...", "success");
					setMessage(data.message);
					setError("");
				} else if (data.status === 400) {
					swal("Error!", "Something is wrong...", "error");
					setMessage("");
					setError(data.message);
				}
			});
	};

	useEffect(() => {
		const url = `${process.env.REACT_APP_SERVER_URL}/admins`;
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
			.then((data) => setAdminData(data));
	}, [dataChanged, navigate]);

	return (
		<section className="settings m-3 p-3">
			<div className="userListTitleContainer">
				<h1 className="userTitle">Add Admin</h1>
			</div>
			<div className="" style={{ width: "100%" }}>
				<div className="mx-4">
					{isLoading && <h4 className="text-center">Sending...</h4>}
					{message && (
						<Alert variant="success">
							<h5 className="text-center">{message}</h5>
						</Alert>
					)}
					{error && (
						<Alert variant="danger">
							<h5 className="text-center">{error}</h5>
						</Alert>
					)}
				</div>
				<form onSubmit={handleSubmit} className="">
					<div className="d-flex align-items-lg-center flex-lg-row flex-column gap-lg-5 gap-md-2">
						<div className="d-flex justify-content-between align-items-center my-3 w-100 flex-lg-row flex-column">
							<label htmlFor="receiver" className="fs-5">
								Make Admin:
							</label>
							<input
								id="receiver"
								type="email"
								placeholder="Write new admin email..."
								className="ms-3 ps-2 form-control w-50 my-3"
								onChange={handleAdminEmail}
								required
							/>
							<div className="" style={{ textAlign: "right" }}>
								<button type="submit" className="btn btn-primary">
									Update Admin
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="mt-4">
				<div
					className="d-flex justify-content-between align-items-center"
					style={{ width: "100%" }}
				>
					<div>
						<h4 className="m-0 fw-bold">Admin List</h4>
					</div>
					{/* <div>
						<AddNumberList
							changedData={changedData}
							setChangedData={setChangedData}
						/>
					</div> */}
				</div>
			</div>
			<div className="mt-4">
				<div>
					<AdminList
						adminData={adminData}
						setAdminData={setAdminData}
						dataChanged={dataChanged}
						setDataChanged={setDataChanged}
					/>
				</div>
			</div>
		</section>
	);
};

export default Settings;
