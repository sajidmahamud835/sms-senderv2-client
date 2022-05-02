import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Settings
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import FirebaseApp from "../../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Sidebar() {
  const auth = getAuth(FirebaseApp);
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/sms" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Send Bulk Message
              </li>
            </Link>
          </ul>
        </div>
        {user.email === "sajidmahamud835@gmail.com" &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Admin</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  All Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  All Campaigns
                </li>
              </Link>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Subscription Plans
              </li>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                User Reports
              </li>
            </ul>
          </div>}
        {!user.email === "sajidmahamud835@gmail.com" &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">User</h3>
            <ul className="sidebarList">
              <Link to="/profile" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  My Profile
                </li>
              </Link>
              <Link to="/myCampaigns" className="link">
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  My Campaigns
                </li>
              </Link>
              <Link to="/myCampaigns" className="link">
                <li className="sidebarListItem">
                  <MailOutline className="sidebarIcon" />
                  Message Templates
                </li>
              </Link>
              <Link to="/myCampaigns" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  My Contacts
                </li>
              </Link>

              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                My Subscription
              </li>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                My Reports
              </li>
            </ul>
          </div>}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Website</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage API
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              API Analytics
            </li>
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              Website Settings
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
