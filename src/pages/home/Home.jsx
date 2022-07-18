import React, { useEffect, useState } from 'react';
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { FiUser, FiUserCheck } from 'react-icons/fi';
import { Message } from "@material-ui/icons";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [campaignsCount, setCampaignsCount] = useState({});
  const [usersCount, setUsersCount] = useState({});
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [pendingCampaigns, setPendingCampaigns] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [smsLogs, setSmsLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveCampaigns(campaignsCount.activeCampaigns);
    setActiveUsers(usersCount.activeUsersCount);
    setPendingCampaigns(campaignsCount.scheduledCampaigns);
    setPendingUsers(usersCount.inactiveUsersCount);
    setTotalCampaigns(campaignsCount.activeCampaigns + campaignsCount.scheduledCampaigns);
    setTotalUsers(usersCount.activeUsersCount + usersCount.inactiveUsersCount);
    console.log(campaignsCount, usersCount);
  }
    , [campaignsCount, usersCount]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/campaigns/count/`, {
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
      }
      )
      .then((data) => setCampaignsCount(data));

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/count/`, {
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
      }
      )
      .then((data) => setUsersCount(data));
  }, [navigate]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/sms/logs/month`, {
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
      }
      )
      .then((data) => {
        setSmsLogs(data.report);
      }
      );
  }, [navigate]);


  return (
    <div className="home">
      <FeaturedInfo data={[
        {
          id: 1,
          name: "Active Users",
          value: activeUsers,
          icon: <FiUserCheck />,
        },
        {
          id: 2,
          name: "Pending Users",
          value: pendingUsers,
          icon: <FiUser />,
        },
        {
          id: 3,
          name: "Total Users",
          value: totalUsers,
          icon: <FiUser />,
        },
        {
          id: 4,
          name: "Active Campaigns",
          value: activeCampaigns,
          icon: <Message />,
        },
        {
          id: 5,
          name: "Pending Campaigns",
          value: pendingCampaigns,
          icon: <Message />,
        },
        {
          id: 6,
          name: "Total Campaigns",
          value: totalCampaigns,
          icon: <Message />,
        }
      ]} />

      {smsLogs.length > 0 ? <Chart data={smsLogs} title="Monthly API Analytics" grid dataKey="SMS Sent" /> : <div className='noData'>Loading Monthly API Analytics...</div>}
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


