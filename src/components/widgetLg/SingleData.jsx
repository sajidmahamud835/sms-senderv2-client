import React from "react";
import { Link } from "react-router-dom";

const SingleData = (props) => {
	const { _id, name, email, status } = props.singleCData;

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
				<td className="widgetLgUser">
					<img
						src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						alt=""
						className="widgetLgImg"
					/>
					<span className="widgetLgName">{email}</span>
				</td>
				<td className="widgetLgCampaign">{name}</td>
				<td className="widgetLgDate">2 Jun 2021</td>
				<td className="widgetLgAmount">1000</td>
				<td className="widgetLgStatus">
					{status === "Scheduled" && <Button type="Pending" />}
					{status === "Draft" && <Button type="Declined" />}
					{status === "Active" && <Button type="Approved" />}
				</td>
			</tr>
		</>
	);
};

export default SingleData;
