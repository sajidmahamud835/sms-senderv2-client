import React from "react";
import { Link } from "react-router-dom";

const SingleData = (props) => {
	const { _id, name, email, status, startDate } = props.singleCData;

	const Button = ({ type }) => {
		return (
			<button className={"widgetLgButton " + type}>
				<Link
					to={`/campaign/` + _id}
					className="text-dark text-decoration-none"
				>
					{type}
				</Link>
			</button>
		);
	};

	return (
		<>
			<tr className="widgetLgTr">
				<td className="table-items widgetLgCampaign">{name}</td>
				<td className="table-items widgetLgDate">{startDate}</td>
				<td className="table-items widgetLgStatus">
					{status === "Scheduled" && <Button type="Pending" />}
					{status === "Draft" && <Button type="Declined" />}
					{status === "Active" && <Button type="Approved" />}
				</td>
			</tr>
		</>
	);
};

export default SingleData;
