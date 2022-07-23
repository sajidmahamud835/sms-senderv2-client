import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import UseFirebase from "../../Hooks/UseFirebase";
import "./CreateNewUser.css";

const NewUser = () => {
	const [fullName, setFullName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [isActiveUser, setIsActiveUser] = useState("no");
	const [errorMassage, setErrorMassage] = useState(false);
	const [emailErrorMassage, setEmailErrorMassage] = useState("");
	const [passwordErrorMassage, setPasswordErrorMassage] = useState("");
	const [disabled, setDisabled] = useState(false);

	const [imageUrl, setImageUrl] = useState(
		"https://i.picsum.photos/id/46/200/200.jpg?hmac=lUGWM3WNJB0TQ-OXq3KI1x-TPgKIuViXG4lKHiCGbao"
	);

	const { user, error, loading, registerByEmailPass } = UseFirebase();

	if (user?.photoURL) {
		setImageUrl(user?.photoURL);
	}

	// const id = JSON.stringify(Math.round(Math.random() * 100000));
	//id will be added in server side

	const userTotalData = {
		userName,
		mobileNumber,
		address,
		gender,
		isActiveUser,
		imageUrl,
	};

	useEffect(() => {
		if (fullName !== "" && userName !== "" && email !== "" && password !== "" && mobileNumber !== "" && address !== "" && gender !== "" && isActiveUser !== "" && imageUrl !== "") {
			setErrorMassage(false);
		} else {
			setErrorMassage("Please fill in the inputs");
		}
		const regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
		const regexPassword = new RegExp('^.{6,}$');
		// for email
		if (!regexEmail.test(email)) {
			setEmailErrorMassage("Enter valid email.");
		} else {
			setEmailErrorMassage(false);
		}
		//for password
		if (!regexPassword.test(password)) {
			setPasswordErrorMassage("Invalid password.");
		} else {
			setPasswordErrorMassage(false);
		}
		// disable btn
		if (errorMassage || emailErrorMassage || passwordErrorMassage) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [address, email, emailErrorMassage, errorMassage, fullName, gender, imageUrl, isActiveUser, mobileNumber, password, passwordErrorMassage, userName]);

	const createUser = (e) => {

		// fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
		// 	method: "PUT",
		// 	headers: {
		// 		"content-type": "application/json",
		// 	},
		// 	body: JSON.stringify(userTotalData),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data));

		e.preventDefault();
		// alert("data submitted");

		// Condition
		if (!disabled) {
			registerByEmailPass(email, password, fullName, userTotalData)
				.then(() => {
					alert("user created");
				});
		}

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
						{/* {error && (
							<Alert variant="danger">
								<h5 className="text-center">{error.message}</h5>
							</Alert>
						)} */}
					</div>
				</div>
				<form onSubmit={createUser} className="newUserForm">
					<div className="newUserItem">
						<label>Username</label>
						<input
							type="text"
							placeholder="john32"
							onChange={(e) => setUserName(e.target.value)}
						// required
						/>
					</div>
					<div className="newUserItem">
						<label>Full Name</label>
						<input
							onChange={(e) => setFullName(e.target.value)}
							// required
							type="text"
							placeholder="John Smith"
						/>
					</div>
					<div className="newUserItem">
						<label>Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							// required
							type="email"
							placeholder="john@gmail.com"
						/>
					</div>
					<div className="newUserItem">
						<label>Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							// required
							type="password"
							placeholder="password"
						/>
					</div>
					<div className="newUserItem">
						<label>Phone</label>
						<input
							type="text"
							placeholder="+1 123 456 78"
							onChange={(e) => setMobileNumber(e.target.value)}
						// required
						/>
					</div>
					<div className="newUserItem">
						<label>Address</label>
						<input
							type="text"
							placeholder="New York | USA"
							onChange={(e) => setAddress(e.target.value)}
						// required
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
								onChange={(e) => setGender(e.target.value)}
							// required
							/>
							<label htmlFor="male">Male</label>
							<input
								type="radio"
								name="gender"
								id="female"
								value="female"
								onChange={(e) => setGender(e.target.value)}
							// required
							/>
							<label htmlFor="female">Female</label>
							<input
								type="radio"
								name="gender"
								id="other"
								value="other"
								onChange={(e) => setGender(e.target.value)}
							// required
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
							onChange={(e) => setIsActiveUser(e.target.value)}
						// required
						>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div>
						{(errorMassage || emailErrorMassage || passwordErrorMassage || error) && <h5 className="text-danger my-3">* {errorMassage || emailErrorMassage || passwordErrorMassage || error}</h5>}
						<span className="d-block mb-3">
							After creating the user, you will be logged as the new user.
						</span>
						<button type="submit" disabled={disabled} className="newUserButton">
							Create New User
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewUser;
