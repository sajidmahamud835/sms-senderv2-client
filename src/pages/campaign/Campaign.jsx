import React from 'react';
import { Link } from "react-router-dom";
import "./campaign.css";
import Chart from "../../components/chart/Chart"
import { campaignData } from "../../dummyData"
import { ArrowDownward, ArrowUpward, Publish } from "@material-ui/icons";
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
            <div className="row">
                <div className="col-8">
                    <div className="featuredItem">
                        <div className='d-flex justify-content-between'>
                            <div>Number</div>
                            <div>Status</div>
                        </div>

                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <div className="featuredItem">
                            <span className="featuredTitle">Sent Massage</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">130 <ArrowUpward className="featuredIcon" /></span>

                            </div>
                        </div>

                        <div className="featuredItem">
                            <span className="featuredTitle">Cost</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">$225 <ArrowUpward className="featuredIcon" /></span>
                            </div>
                        </div>
                        <div className="featuredItem">
                            <span className="featuredTitle">Failed</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">12 /1000 <ArrowDownward className="featuredIcon negative" /></span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Campaign;

