import React from 'react';
import "./sidebar.css";
import { LineStyle, Timeline, PermIdentity, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, Settings } from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UseFirebase from '../../Hooks/UseFirebase';

const Sidebar = ({ setClose }) => {
  const { user, admin, logOut } = UseFirebase();
  const [active, setActive] = useState('dashboard');
  useEffect(() => {
    document.getElementById(active).classList.add("active");
  }, [active]);

  const makeActive = (id) => {
    document.getElementById(active).classList.remove("active");
    setActive(id);
  };

  const logout = () => {
    logOut();
  };
  return (
    <div className="sidebar shadow-sm" style={{}}>
      <div className="sidebarWrapper" onClick={() => setClose(true)}>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li onClick={(e) => makeActive('dashboard')} id="dashboard" className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/sms" className="link">
              <li onClick={(e) => makeActive('sms')} id="sms" className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Send Quick Message
              </li>
            </Link>
          </ul>
        </div>
        {admin &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Admin</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li onClick={(e) => makeActive('users')} id="users" className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Manage Users
                </li>
              </Link>
              <Link to="/campaigns" className="link">
                <li onClick={(e) => makeActive('campaigns')} id="campaigns" className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  Manage Campaigns
                </li>
              </Link>
              <Link to="/templates" className="link">
                <li onClick={(e) => makeActive('myTemplates')} id="myTemplates" className="sidebarListItem">
                  <MailOutline className="sidebarIcon" />
                  Message Templates
                </li>
              </Link>
              <Link to="/manage-subscriptions" className="link">
                <li onClick={(e) => makeActive('subscription')} id="subscription" className="sidebarListItem">
                  <AttachMoney className="sidebarIcon" />
                  Manage Subscriptions
                </li>
              </Link>
              <Link to="/all-contacts-lists" className="link">
                <li onClick={(e) => makeActive('reports')} id="reports" className="sidebarListItem">
                  <ViewListIcon className="sidebarIcon" />
                  Manage Contact List
                </li>
              </Link>
              <Link to="/reports" className="link">
                <li onClick={(e) => makeActive('reports')} id="reports" className="sidebarListItem">
                  <BarChart className="sidebarIcon" />
                  Reports
                </li>
              </Link>
            </ul>
          </div>
        }
        {/* {admin === false && */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            <Link to="/profile" className="link">
              <li onClick={(e) => makeActive('profile')} id="profile" className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                My Profile
              </li>
            </Link>
            <Link to="/campaigns" className="link">
              <li onClick={(e) => makeActive('myCampaigns')} id="myCampaigns" className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                My Campaigns
              </li>
            </Link>
            <Link to="/templates" className="link">
              <li onClick={(e) => makeActive('myTemplates')} id="myTemplates" className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Message Templates
              </li>
            </Link>
            <Link to="/contacts" className="link">
              <li onClick={(e) => makeActive('myContacts')} id="myContacts" className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                My Contacts
              </li>
            </Link>
            <Link to="/manage-subscriptions" className="link">
              <li onClick={(e) => makeActive('mySubscription')} id="mySubscription" className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                My Subscription
              </li>
            </Link>
            <Link to="/reports" className="link">
              <li onClick={(e) => makeActive('myReports')} id="myReports" className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                My Reports
              </li>
            </Link>

            <li onClick={logout} id="settings" className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
        {/* } */}
        {admin &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Website</h3>
            <ul className="sidebarList">
              <Link to="/manageAPI" className="link">
                <li onClick={(e) => makeActive('manageAPI')} id="manageAPI" className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  Manage API
                </li>
              </Link>
              <Link to="/apiAnalytics" className="link">
                <li onClick={(e) => makeActive('apiAnalytics')} id="apiAnalytics" className="sidebarListItem">
                  <Timeline className="sidebarIcon" />
                  API Analytics
                </li>
              </Link>
              <Link to="/settings" className="link">
                <li onClick={(e) => makeActive('settings')} id="settings" className="sidebarListItem">
                  <Settings className="sidebarIcon" />
                  Website Settings
                </li>
              </Link>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Sidebar; 