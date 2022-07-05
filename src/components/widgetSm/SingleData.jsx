import React from "react";
import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";

const SingleData = (props) => {
	const { id, imageUrl, displayName, isActiveUser } = props.userData;

	return (
		<>
			{isActiveUser === "no" && (
				<li className="widgetSmListItem">
					<img src={imageUrl} alt={displayName} className="widgetSmImg" />
					<div className="widgetSmUser">
						<span className="widgetSmUsername">{displayName}</span>
						<span className="widgetSmUserTitle">Engineer</span>
					</div>
					<Link to={`/user/${id}`} className="widgetSmButton btn">
						<Visibility className="widgetSmIcon" />
						Display
					</Link>
				</li>
			)}
			{!isActiveUser === "no" && <span>So user is in pending...</span>}
		</>
	);
};

export default SingleData;
