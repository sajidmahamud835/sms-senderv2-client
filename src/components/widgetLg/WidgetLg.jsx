import React, { useEffect, useState } from "react";
import SingleData from "./SingleData";
import "./widgetLg.css";

const WidgetLg = () => {
	const [cdata, setCData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/campaign-list")
			.then((res) => res.json())
			.then((data) => setCData(data));
	}, []);

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
