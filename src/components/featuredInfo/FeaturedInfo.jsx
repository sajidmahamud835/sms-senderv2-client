import React from 'react';
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Active Campaign</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">130</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Active Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">3</span>
          <span className="featuredMoneyRate">
            -57.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Twilio API Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo; 
