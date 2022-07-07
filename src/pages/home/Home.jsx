import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import React from 'react';
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <Grid container spacing={1}>
          <Grid item sm={12} md={6}>
            <WidgetSm />
          </Grid>
          <Grid item sm={12} md={6}>
            <WidgetLg />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;


