<<<<<<< HEAD
import { Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { campaignData } from "../../dummyData";
import "./campaign.css";

export default function Campaign() {
	return (
		<div className="campaign">
			<div className="campaignTitleContainer">
				<h1 className="campaignTitle">Campaign</h1>
				<Link to="/newcampaign">
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
				<div className="campaignTopRight">
					<div className="campaignInfoTop">
						<img
							src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
							alt=""
							className="campaignInfoImg"
						/>
						<span className="campaignName">Test Campaign 01</span>
					</div>
					<div className="campaignInfoBottom">
						<div className="campaignInfoItem">
							<span className="campaignInfoKey">id:</span>
							<span className="campaignInfoValue">123</span>
						</div>
						<div className="campaignInfoItem">
							<span className="campaignInfoKey">sms sent:</span>
							<span className="campaignInfoValue">5123</span>
						</div>
						<div className="campaignInfoItem">
							<span className="campaignInfoKey">active:</span>
							<span className="campaignInfoValue">yes</span>
						</div>
						<div className="campaignInfoItem">
							<span className="campaignInfoKey">completed:</span>
							<span className="campaignInfoValue">no</span>
						</div>
					</div>
				</div>
			</div>
			<div className="campaignBottom">
				<form className="campaignForm">
					<div className="campaignFormLeft">
						<label>Campaign Name</label>
						<input type="text" placeholder="Test Campaign 01" />
						<label>Smart Campaign</label>
						<select name="inStock" id="idStock">
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
						<label>Active</label>
						<select name="active" id="active">
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div className="campaignFormRight">
						<div className="campaignUpload">
							<img
								src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
								alt=""
								className="campaignUploadImg"
							/>
							<label htmlFor="file">
								<Publish />
							</label>
							<input type="file" id="file" style={{ display: "none" }} />
						</div>
						<button className="campaignButton">Update</button>
					</div>
				</form>
			</div>
		</div>
	);
}
=======
import React from 'react';
import { Link } from "react-router-dom";
import "./campaign.css";
import Chart from "../../components/chart/Chart"
import { campaignData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
const Campaign = () => {
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
                    <Chart data={campaignData} dataKey="Sales" title="Campaign Performance" />
                </div> 
            </div> 
        </div>
    );
};

export default Campaign;

>>>>>>> a2e6addc2ec0f1672fdc58b3ff06c41b35cf3257
