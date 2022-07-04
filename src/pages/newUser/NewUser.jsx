import { useState } from "react";
import { Alert } from "react-bootstrap";
import UseFirebase from "../../Hooks/UseFirebase";
import "./newUser.css";

const NewUser = () => {
	const [name, setName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [isActiveUser, setIsActiveUser] = useState("no");
	const [imageUrl, setImageUrl] = useState(
		"https://i.picsum.photos/id/46/200/200.jpg?hmac=lUGWM3WNJB0TQ-OXq3KI1x-TPgKIuViXG4lKHiCGbao"
	);

	const { user, error, loading, registerByEmailPass } = UseFirebase();

	if (user?.photoURL) {
		setImageUrl(user?.photoURL);
	}

	const id = JSON.stringify(Math.round(Math.random() * 100000));

	const userTotalData = {
		id,
		userName,
		mobileNumber,
		address,
		gender,
		isActiveUser,
		imageUrl,
	};

	const createUser = (e) => {
		registerByEmailPass(email, password, name, userTotalData);

		// fetch("http://localhost:4000/users", {
		// 	method: "PUT",
		// 	headers: {
		// 		"content-type": "application/json",
		// 	},
		// 	body: JSON.stringify(userTotalData),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data));

		e.preventDefault();
		console.log("data submitted");
	};

	return (
		<div className="newUser">
			<div className="card shadow px-5 py-4 my-5 w-100 mx-5">
				<h1 className="newUserTitle">New User</h1>
				<div className="" style={{ width: "800px" }}>
					<div className="mt-2">
						{loading && <h4 className="text-center">Sending...</h4>}
						{/* {user && (
							<Alert variant="success">
								<h5 className="text-center">User successfully created.</h5>
							</Alert>
						)} */}
						{error && (
							<Alert variant="danger">
								<h5 className="text-center">{error.message}</h5>
							</Alert>
						)}
					</div>
				</div>
				<form onSubmit={createUser} className="newUserForm">
					<div className="newUserItem">
						<label>Username</label>
						<input
							type="text"
							placeholder="john32"
							onBlur={(e) => setUserName(e.target.value)}
							required
						/>
					</div>
					<div className="newUserItem">
						<label>Full Name</label>
						<input
							onBlur={(e) => setName(e.target.value)}
							required
							type="text"
							placeholder="John Smith"
						/>
					</div>
					<div className="newUserItem">
						<label>Email</label>
						<input
							onBlur={(e) => setEmail(e.target.value)}
							required
							type="email"
							placeholder="john@gmail.com"
						/>
					</div>
					<div className="newUserItem">
						<label>Password</label>
						<input
							onBlur={(e) => setPassword(e.target.value)}
							required
							type="password"
							placeholder="password"
						/>
					</div>
					<div className="newUserItem">
						<label>Phone</label>
						<input
							type="text"
							placeholder="+1 123 456 78"
							onBlur={(e) => setMobileNumber(e.target.value)}
							required
						/>
					</div>
					<div className="newUserItem">
						<label>Address</label>
						<input
							type="text"
							placeholder="New York | USA"
							onBlur={(e) => setAddress(e.target.value)}
							required
						/>
					</div>
					<div className="newUserItem">
						<label>Gender</label>
						<div className="newUserGender">
							<input
								type="radio"
								name="gender"
								id="male"
								value="male"
								onBlur={(e) => setGender(e.target.value)}
								required
							/>
							<label htmlFor="male">Male</label>
							<input
								type="radio"
								name="gender"
								id="female"
								value="female"
								onBlur={(e) => setGender(e.target.value)}
								required
							/>
							<label htmlFor="female">Female</label>
							<input
								type="radio"
								name="gender"
								id="other"
								value="other"
								onBlur={(e) => setGender(e.target.value)}
								required
							/>
							<label htmlFor="other">Other</label>
						</div>
					</div>
					<div className="newUserItem">
						<label>Active</label>
						<select
							className="newUserSelect"
							name="active"
							id="active"
							defaultValue={isActiveUser}
							onBlur={(e) => setIsActiveUser(e.target.value)}
							required
						>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div>
						<span className="d-block mt-3">
							After creating the user, you will be logged as the new user.
						</span>
						<button type="submit" className="newUserButton">
							Create New User
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewUser;
