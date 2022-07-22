import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import SingleData from "./SingleData";
import { useNavigate } from "react-router-dom";

const WidgetSm = () => {
	const [usersData, setUsersData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const url = `${process.env.REACT_APP_SERVER_URL}/users/inactive`;
		fetch(url, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then((res) => {
				if (res.status === 403 || res.status === 401) {
					navigate('/login');
				} else {
					return res.json();
				}
			})
			.then((data) => setUsersData(data));
	}, [navigate]);


	return (
		<div className="widgetSm" style={{ width: "100%" }}>
			<span className="widgetSmTitle">Pending Members</span>
			<ul className="widgetSmList">
				{
					usersData.length > 0 ? (

						usersData.slice(0, 5).map((user) => (
							<SingleData
								key={user.id}
								userData={user}
							/>
						))
					) : (
						<div>
							<div className="alert alert-warning text-center" role="alert">
								No pending members.
							</div>
						</div>

					)


				}
			</ul>
		</div>
	);
};

export default WidgetSm;

