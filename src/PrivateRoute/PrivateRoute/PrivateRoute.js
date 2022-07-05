import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";

const PrivateRoute = ({ children, ...rest }) => {
	const { user, loading } = UseFirebase();

	// console.log(user)

	let location = useLocation();
	if (loading) {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>
					<CircularProgress />
				</div>
			</div>
		);
	}
	if (user.email) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
