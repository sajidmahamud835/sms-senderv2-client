import React, { useEffect, useState } from "react";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import UseFirebase from "../../Hooks/UseFirebase";
import { IconButton } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './topbar.css';
const Topbar = ({ small, setClose, close }) => {
	const { admin, user, logOut, loading } = UseFirebase();
	const [anchorEl, setAnchorEl] = useState(null);
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [dataChanged, setDataChanged] = useState(true);
	const [isUpdated, setIsUpdated] = useState(0);
	const navigate = useNavigate();

	// const [userName, setUserName] = React.useState("Admin")
	// open
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

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// console.log(avatarName);
	function stringAvatar(name) {
		const userName = name?.split(" ");
		// console.log({ userName });
		const sliceName = [];
		if (userName.length > 0) {
			userName?.map(word => {
				return sliceName.push(word.slice(0, 1));
			});
			// sliceName = sliceName + word.slice(0, 1)
		}
		let shortName = "";
		sliceName?.map(s => shortName += s);
		return {
			// children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
			children: shortName
		};
	}


	const logout = () => {
		logOut();
	};
	const goForLogIn = () => {
		navigate("/login");
	};
	// const [user, loading, error] = useAuthState(auth);

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
					{small &&
						// <button  className="campaignAddButton">{close ? "open" : "close"}</button>
						// <IconButton onClick={() => setClose(!close)} aria-label="menu" style={{ color: 'white' }} size="large">
						// 	<MenuIcon fontSize="inherit" />
						// </IconButton>
						<button onClick={() => setClose(!close)} className="menuBtn">
							{close ? <MenuIcon className="menuIcon" /> : <CloseIcon className="menuIcon" />}
						</button>
					}
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
							{(isUpdated < 1) &&
								<span className="topIconBadge">1</span>
							}
						</div>
						<ul className="dropdown-menu" aria-labelledby="NotificationsMenu">
							{/* <li><span className="dropdown-item">We have no notification for you today.</span></li> */}
							<li>
								<Link to="/profile" onClick={() => setIsUpdated(isUpdated + 1)} className="dropdown-item" type="button">
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
										{userData.imageUrl ? (
											<Avatar
												src={userData.imageUrl}
												alt="User"
											/>
										) : (
											<Avatar
												style={{ color: "black" }}
												{...stringAvatar(user?.displayName ? (user.displayName) : ("Sajid Mahamud"))}
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
