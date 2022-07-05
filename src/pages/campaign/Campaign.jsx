import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "./campaign.css";
import Chart from "../../components/chart/Chart"
import { campaignData } from "../../dummyData"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const Campaign = () => {
    const [cdata, setCData] = useState({});

    let { Id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/campaign-details/${Id}`)
            .then((res) => res.json())
            .then((data) => setCData(data[0]));
    }, [Id]);
    console.log(cdata)
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
                        <div className='d-block'>
                            <div><h4>Name: {cdata.name}</h4></div>
                            <div><h6>Number: {cdata.number}</h6></div>
                            <div><h6>Campaign Id: {cdata._id}</h6></div>
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
            <button className="addCampaignButton m-5">Stop</button>
            <button className="addCampaignButton m-5">Pause</button>
        </div>
    );
};

export default Campaign;

