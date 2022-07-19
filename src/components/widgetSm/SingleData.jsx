import React from "react";
import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";

const SingleData = (props) => {
	const { id, imageUrl, displayName, isActiveUser, email } = props.userData;

	return (
		<>
			{isActiveUser === "no" && (
				<li className="widgetSmListItem">
					<div className="d-flex align-items-center">
						<img src={imageUrl} alt={displayName} className="widgetSmImg" />
						<div className="widgetSmUser ms-3">
							<span className="widgetSmUsername">{displayName}</span>
							<span className="widgetSmUserTitle">{email}</span>
						</div>
					</div>
					<Link to={`/user/${id}`} className="widgetSmButton btn">
						<Visibility className="widgetSmIcon" />
						Display
					</Link>
				</li>
			)}
		</>
	);
};

export default SingleData;
