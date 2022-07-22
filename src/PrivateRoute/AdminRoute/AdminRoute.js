import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import UseFirebase from "../../Hooks/UseFirebase";


const AdminRoute = ({ children, ...rest }) => {
	const { user, admin, isAdminLoading, loading } = UseFirebase();
	const location = useLocation();
	if (isAdminLoading || loading) {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>
					<LoadingSpinner />
				</div>
			</div>
		);
	}
	else if (user.email && admin) {
		return children;
	}
	return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
