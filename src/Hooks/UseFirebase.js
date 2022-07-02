import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initializeAuthentication from "../firebase/FirebaseInit";
import { SubscriptionsRows } from "../dummyData";

initializeAuthentication();

const UseFirebase = () => {
	let navigate = useNavigate();
	const [user, setUser] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [isAdminLoading, setAdminIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const auth = getAuth();
	const GoogleProvider = new GoogleAuthProvider();

	const handleGoogleSignIn = () => {
		return signInWithPopup(auth, GoogleProvider).finally(() => {
			setLoading(false);
		});
	};

	const registerByEmailPass = (email, password, name, userTotalData) => {
		// console.log(email, password, name);
		console.log(userTotalData);
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				navigate("/login");
				// console.log(result);
				setUser(result.user);
				// send to database
				saveUser(email, name, userTotalData, "POST");
				// ================
				updateProfile(auth.currentUser, { displayName: name }).then(
					(result) => {
						navigate("/login");
					}
				);
				setUser(result.user);
				setError("");
			})
			.catch((error) => {
				setError(error.code);
			});
	};

	const logInEmailPassword = (email, password) => {
		console.log(email, password);
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				setUser(result.user);
				navigate("/dashboard");
				setError("");
			})
			.catch((error) => {
				setError(error.code);
			});
	};

	const logOut = () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				setUser({});
			})
			.finally(() => setLoading(false));
	};

	// console.log(SubscriptionsRows);

	const saveUser = (email, displayName, userTotalData, method) => {
		console.log(userTotalData);
		const user = {
			email,
			displayName,
			subscriptions: "none",
			...userTotalData,
		};
		// send user data to database
		fetch("http://localhost:4000/users", {
			method: method,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setError("");
			} else {
				setUser({});
			}
			setLoading(false);
		});
		return () => unsubscribe;
	}, [auth]);

	useEffect(() => {
		setAdminIsLoading(true);
		if (
			user?.email === "sajidmahamud835@gmail.com" ||
			user?.email === "admin@admin.com" ||
			user?.email === "contactsamsulalam@gmail.com"
		) {
			setAdminIsLoading(false);
			setAdmin(true);
		}
	}, [user?.email]);

	// console.log(user?.displayName, "ADmin ?", admin);

	return {
		handleGoogleSignIn,
		user,
		admin,
		error,
		logOut,
		loading,
		registerByEmailPass,
		logInEmailPassword,
	};
};

export default UseFirebase;
