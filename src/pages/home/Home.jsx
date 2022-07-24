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
import UseFirebase from '../../Hooks/UseFirebase';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
const Home = () => {
  const [campaignsCount, setCampaignsCount] = useState({});
  const [userCampaignsCount, setUserCampaignsCount] = useState({});
  const [usersCount, setUsersCount] = useState({});
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [pendingCampaigns, setPendingCampaigns] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [smsLogs, setSmsLogs] = useState([]);
  const navigate = useNavigate();
  const { admin, isAdminLoading, user } = UseFirebase();

  useEffect(() => {
    if (!isAdminLoading && admin) {
      setActiveCampaigns(campaignsCount.activeCampaigns);
      setActiveUsers(usersCount.activeUsersCount);
      setPendingCampaigns(campaignsCount.scheduledCampaigns);
      setPendingUsers(usersCount.inactiveUsersCount);
      setTotalCampaigns(campaignsCount.activeCampaigns + campaignsCount.scheduledCampaigns);
      setTotalUsers(usersCount.activeUsersCount + usersCount.inactiveUsersCount);
      console.log(campaignsCount, usersCount);
    }
  }
    , [campaignsCount, usersCount]);

  useEffect(() => {
    if (!isAdminLoading) {
      if (admin) {
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
      } if (!admin) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/campaigns/count/${user?.email}`, {
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
          .then((data) => setUserCampaignsCount(data));
      }
    }
  }, [admin, isAdminLoading, navigate, user.email]);

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

  useEffect(() => {
    if (!admin && !isAdminLoading) {
      console.log(userCampaignsCount);
      setActiveCampaigns(userCampaignsCount.active);
      setPendingCampaigns(userCampaignsCount.scheduled);
      setTotalCampaigns(userCampaignsCount.active + userCampaignsCount.scheduled);
    }
  }, [admin, isAdminLoading, userCampaignsCount]);

  const data = [
    { name: "Group A", value: 50 },
    { name: "Group B", value: 20 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 10 }
  ];
  return (
    <div className="home">
      {admin &&
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
        ]} />}

      {!admin &&
        <FeaturedInfo data={[
          {
            id: 1,
            name: "Active Campaigns",
            value: activeCampaigns,
            icon: <Message />,
          },
          {
            id: 2,
            name: "Pending Campaigns",
            value: pendingCampaigns,
            icon: <Message />,
          },
          {
            id: 3,
            name: "Total Campaigns",
            value: totalCampaigns,
            icon: <Message />,
          }
        ]}
        />}

      {admin &&
        <div>
          {smsLogs.length > 0 ? <Chart data={smsLogs} title="Monthly API Analytics" grid dataKey="SMS Sent" /> : <div className='noData'>Loading Monthly API Analytics...</div>}
        </div>
      }


      <div className="homeWidgets">
        <Grid container spacing={1}>
          {admin &&
            <Grid item style={{ width: "100%" }} sm={12} md={6}>
              <WidgetSm />
            </Grid>
          }
          <Grid item style={{ width: "100%" }} sm={12} md={6}>
            <WidgetLg />
          </Grid>
          <Grid item style={{ width: "100%" }} sm={12} md={6}>
            <PieChartComponent data={data} />
          </Grid>

        </Grid>
      </div>


    </div>
  );
};

export default Home;


