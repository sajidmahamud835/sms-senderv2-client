import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./campaign.css";
import Chart from "../../components/chart/Chart";
import { campaignData } from "../../dummyData";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const Campaign = () => {
	const [cdata, setCData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [dataChanged, setDataChanged] = useState(true);

	let { Id } = useParams();

	const statusChanged = (e) => {
		e.preventDefault();
		const statusValue = e.target.value;
		const newStatus = { status: statusValue };
		console.log(newStatus);
		const url = `${process.env.REACT_APP_SERVER_URL}/campaign-details/${Id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newStatus),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setIsLoading(false);
				setDataChanged(!dataChanged);
			});
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/campaign-details/${Id}`)
			.then((res) => res.json())
			.then((data) => setCData(data[0]));
	}, [Id, dataChanged]);

	console.log(cdata);

	return (
		<div className="campaign">
			<div className="campaignTitleContainer">
				<h1 className="campaignTitle">Campaign</h1>
				<Link to="/new-campaign">
					<button className="campaignAddButton">Create</button>
				</Link>
			</div>
			<div className="campaignTop">
				<div className="campaignTopLeft">
					<Chart
						data={campaignData}
						dataKey="Sales"
						title="Campaign Performance"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-8">
					<div className="featuredItem">
						<div>
							<h4>{cdata.name}</h4>
						</div>
						<div className="d-block">
							<div className="mt-3">
								<h6>Assigned Number: {cdata.number}</h6>
							</div>
							<div className="mt-3">
								<h6>Campaign Id: {cdata._id}</h6>
							</div>
							<div className="d-flex align-items-center mt-3">
								<label>Change Status</label>
								<select
									className="newUserSelect p-1 w-25 ms-3"
									name="active"
									id="active"
									value={cdata.status}
									onChange={(e) => statusChanged(e)}
									required
								>
									<option value="Draft">Draft</option>
									<option value="Scheduled">Scheduled</option>
									<option value="Active">Active</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div>
						<div className="featuredItem">
							<span className="featuredTitle">Sent Massage</span>
							<div className="featuredMoneyContainer">
								<span className="featuredMoney">
									130 <ArrowUpward className="featuredIcon" />
								</span>
							</div>
						</div>

						<div className="featuredItem">
							<span className="featuredTitle">Cost</span>
							<div className="featuredMoneyContainer">
								<span className="featuredMoney">
									$225 <ArrowUpward className="featuredIcon" />
								</span>
							</div>
						</div>
						<div className="featuredItem">
							<span className="featuredTitle">Failed</span>
							<div className="featuredMoneyContainer">
								<span className="featuredMoney">
									12 /1000 <ArrowDownward className="featuredIcon negative" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button className="m-5 btn btn-danger">Stop</button>
			<button className="m-5 btn btn-primary">Pause</button>
		</div>
	);
};

export default Campaign;
