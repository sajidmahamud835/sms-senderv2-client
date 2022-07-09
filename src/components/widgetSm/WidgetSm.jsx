import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import SingleData from "./SingleData";

const WidgetSm = () => {
	const [usersData, setUsersData] = useState([]);

	useEffect(() => {
		const url = `http://localhost:4000/users`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setUsersData(data));
	}, []);

	// console.log(usersData);

	return (
		<div className="widgetSm" style={{ width: "100%" }}>
			<span className="widgetSmTitle">Pending Members</span>
			<ul className="widgetSmList">
				{usersData.map((userData) => (
					<SingleData key={userData._id} userData={userData} />
				))}
			</ul>
		</div>
	);
};

export default WidgetSm;
