import React, { useEffect } from "react";
import "./Topbar.css";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import UseFirebase from "../../Hooks/UseFirebase";

const Topbar = () => {
	const { admin, user, logOut } = UseFirebase();
	const [anchorEl, setAnchorEl] = React.useState(null);
	// const [userName, setUserName] = React.useState("Admin")
	// open
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function stringAvatar(name) {
		return {
			children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
		};
	}

	const logout = () => {
		logOut();
	};
	const goForLogIn = () => {
		navigate("/login");
	};
	// const [user, loading, error] = useAuthState(auth);

	let navigate = useNavigate();
	const goToProfile = () => {
		navigate("/profile");
	};

	// useEffect(() => {
	//     setUserName(user.displayName)
	// }, [user])

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
								<Link to="/profile" className="dropdown-item" type="button">
									Welcome to our website. Please update your profile to enjoy
									all our features.
								</Link>
							</li>
						</ul>
					</div>
					{admin &&
						<div
							onClick={() => navigate("/settings", { replace: true })}
							className="topbarIconContainer"
						>
							<Settings />
						</div>
					}

					<Box sx={{ flexGrow: 0 }}>
						{
							user.email ? (
								<div
									style={{
										display: "flex",
										justifyContent: "space-around",
										alignItems: "center",
									}}
								>
									<Button
										id="basic-button"
										aria-controls={open ? "basic-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
										onClick={handleClick}
									>
										{user.photoURL ? (
											<img
												src={user.photoURL}
												style={{ borderRadius: "50%", width: "50%" }}
												alt="User"
											/>
										) : (
											<Avatar
												style={{ color: "black" }}
												{...stringAvatar("Samsul Alam")}
											/>
										)}
									</Button>
									<Menu
										id="basic-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}
									>
										<MenuItem
											style={{ display: "block" }}
											onClick={goToProfile}
										>
											Profile
										</MenuItem>
										<MenuItem style={{ display: "block" }} onClick={logout}>
											Logout
										</MenuItem>
									</Menu>
								</div>
							) : (
								<Button onClick={goForLogIn} style={{ color: "white" }}>
									Login
								</Button>
							)
							// onClick={goToLogIn}
						}
					</Box>

					{/* <div className="dropdown">
                        <img src="https://media-exp1.licdn.com/dms/image/sync/C5627AQHDoC7cGiF_FQ/articleshare-shrink_480/0/1650973331366?e=2147483647&v=beta&t=dzC8F2yHDQMMfWhCXgE0Pa5V86uta_ULCFF5KKklq1M" alt="" className="topAvatar" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false" />
                        <ul className="dropdown-menu" aria-labelledby="profileMenu">
                            {user && <li><span className="dropdown-item">Hello, {user.email} </span></li>}
                            <li>
                                <hr />
                            </li>
                            <li><button className="dropdown-item" type="button">Profile</button></li>
                            <li><button onClick={logout} className="dropdown-item" type="button">Logout</button></li>
                        </ul>
                    </div> */}
				</div>
			</nav>
		</div>
	);
};

export default Topbar;
