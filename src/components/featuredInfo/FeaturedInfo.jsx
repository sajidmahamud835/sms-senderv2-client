import React from 'react';
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Grid } from '@material-ui/core';
const FeaturedInfo = () => {
  return (
    <div className="featured">
      <Grid container spacing={1}>
        <Grid item sm={12} md={6} lg={4} style={{ minWidth: "100%" }}>
          {/* 1 */}
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
        </Grid>
        <Grid item sm={12} md={6} lg={4} style={{ minWidth: "100%" }}>
          {/* 2 */}
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
        </Grid>
        <Grid item sm={12} md={6} lg={4} style={{ minWidth: "100%" }}>
          {/* 3 */}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default FeaturedInfo; 
