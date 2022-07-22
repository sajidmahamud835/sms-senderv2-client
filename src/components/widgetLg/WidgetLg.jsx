import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFirebase from "../../Hooks/UseFirebase";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
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
					if (res.status === 403 || res.status === 401) {
						navigate('/login');
					} else {
						return res.json();
					}
				})
				.then((data) => setCData(data));
		}
	}, [loading, navigate, user]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="widgetLg" style={{ width: "100%" }}>
			<h3 className="widgetLgTitle">Review Latest Campaigns</h3>
			<table className="widgetLgTable mt-3">
				{
					cdata.length === 0 ?
						<div>
							<div className="alert alert-warning text-center" role="alert">
								No Campaigns Found
							</div>
						</div>
						:
						<>
							<tr className="widgetLgTr">
								<th className="widgetLgTh">Campaign</th>
								<th className="widgetLgTh">Start Date</th>
								<th className="widgetLgTh">Status</th>
							</tr>


							{
								cdata?.map((singleCData) => (
									<SingleData key={singleCData._id} singleCData={singleCData} />
								))
							}

						</>
				}
			</table>
		</div>
	);
};

export default WidgetLg;
