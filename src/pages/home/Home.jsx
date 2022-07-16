import React from 'react';
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { FiUser, FiUserCheck } from 'react-icons/fi';
import { Message } from "@material-ui/icons";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo data={[
        {
          id: 1,
          name: "Active User",
          value: "10",
          icon: <FiUserCheck />,
        },
        {
          id: 2,
          name: "Pending User",
          value: "10",
          icon: <FiUser />,
        },
        {
          id: 3,
          name: "Active Campaign",
          value: "10",
          icon: <Message />,
        },
      ]} />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <Grid container spacing={1}>
          <Grid item style={{ width: "100%" }} sm={12} md={6}>
            <WidgetSm />
          </Grid>
          <Grid item style={{ width: "100%" }} sm={12} md={6}>
            <WidgetLg />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;


