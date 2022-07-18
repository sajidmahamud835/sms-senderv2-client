import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";
import SingleData from "./SingleData";
import "./widgetLg.css";

const WidgetLg = () => {
	const [cdata, setCData] = useState([]);
	const navigate = useNavigate();
	const { user, loading } = UseFirebase();

	useEffect(() => {
		if (!loading && user) {
			fetch(`${process.env.REACT_APP_SERVER_URL}/campaigns/user/${user.email}`, {
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
				.then((data) => setCData(data));
		}
	}, [loading, navigate, user]);

	// console.log(cdata);

	return (
		<div className="widgetLg" style={{ width: "100%" }}>
			<h3 className="widgetLgTitle">Review Latest Campaigns</h3>
			<table className="widgetLgTable mt-3">
				<tr className="widgetLgTr">
					<th className="widgetLgTh">Campaign</th>
					<th className="widgetLgTh">Start Date</th>
					<th className="widgetLgTh">Status</th>
				</tr>
				{cdata.map((singleCData) => (
					<SingleData key={singleCData._id} singleCData={singleCData} />
				))}
			</table>
		</div>
	);
};

export default WidgetLg;
