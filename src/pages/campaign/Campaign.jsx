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

