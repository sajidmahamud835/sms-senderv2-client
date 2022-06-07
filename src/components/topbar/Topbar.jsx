import { NotificationsNone, Settings } from "@material-ui/icons";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import FirebaseApp from "../../firebase/FirebaseApp";
import "./topbar.css";

export default function Topbar() {
	const auth = getAuth(FirebaseApp);
	const logout = () => {
		signOut(auth);
	};
	const [user, loading, error] = useAuthState(auth);
	let navigate = useNavigate();
	return (
		<div className="topbar">
			<nav className="topbarWrapper">
				<div className="topLeft">
					<span className="logo">SMS Sender App</span>
				</div>
				<div className="topRight">
					<div className="dropdown">
						<div
							className="topbarIconContainer"
							id="profileMenu"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<NotificationsNone />
							<span className="topIconBadge">1</span>
						</div>
						<ul className="dropdown-menu" aria-labelledby="NotificationsMenu">
							{/* <li><span className="dropdown-item">We have no notification for you today.</span></li> */}
							<li>
								<Link to="/myProfile" className="dropdown-item" type="button">
									Welcome to our webiste. Please update your profile to enjoy
									all our features.
								</Link>
							</li>
						</ul>
					</div>
					<div
						onClick={() => navigate("/settings", { replace: true })}
						className="topbarIconContainer"
					>
						<Settings />
					</div>
					<div className="dropdown">
						<img
							src="https://media-exp1.licdn.com/dms/image/sync/C5627AQHDoC7cGiF_FQ/articleshare-shrink_480/0/1650973331366?e=2147483647&v=beta&t=dzC8F2yHDQMMfWhCXgE0Pa5V86uta_ULCFF5KKklq1M"
							alt=""
							className="topAvatar"
							id="profileMenu"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						/>
						<ul className="dropdown-menu" aria-labelledby="profileMenu">
							{user && (
								<li>
									<span className="dropdown-item">Hello, {user.email} </span>
								</li>
							)}
							<li>
								<hr />
							</li>
							<li>
								<button className="dropdown-item" type="button">
									Profile
								</button>
							</li>
							<li>
								<button
									onClick={logout}
									className="dropdown-item"
									type="button"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
