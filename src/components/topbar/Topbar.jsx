import React, { useEffect, useState } from "react";
import "./topbar.css";
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
					// console.log(res.status);
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
		const sliceName = [];
		if (userName.length > 0) {
			userName?.map(word => {
				return sliceName.push(word.slice(0, 1));
			});
		}
		let shortName = "";
		sliceName?.map(s => shortName += s);
		return {
			children: shortName
		};
	}


	const logout = () => {
		logOut();
	};
	const goForLogIn = () => {
		navigate("/login");
	};

	const goToProfile = () => {
		navigate("/profile");
	};


	return (
		<div className="topbar">
			<nav className="topbarWrapper">
				<div className="topLeft">
					{small &&
						<button onClick={() => setClose(!close)} className="menuBtn">
							{close ? <MenuIcon className="menuIcon" /> : <CloseIcon className="menuIcon" />}
						</button>
					}
					<span className="logo">SMS Campaign</span>
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
										{userData?.imageUrl ? (
											<Avatar
												src={userData.imageUrl}
												alt="User"
											/>
										) : <>
											{user && <Avatar
												style={{ color: "black" }}
												{...stringAvatar(user?.displayName ? (user.displayName) : ("Sajid Mahamud"))}
											/>}
										</>}
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
						}
					</Box>

				</div>
			</nav>
		</div>
	);
};

export default Topbar;
