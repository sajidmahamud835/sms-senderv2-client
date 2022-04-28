import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CampaignIcon from '@mui/icons-material/Campaign';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";


const Sidebar = () => {
    return (
        <aside id="sidebar">
            <div className="top">
                <div className="logo">SMS Sender App</div>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <li>
                        <DashboardIcon />  <span>Dashboard</span>
                    </li>
                    <li>
                        <PersonOutlineIcon /> <span>Users</span>
                    </li>
                    <li>
                        <CreditCardIcon /> <span>Subscription</span>
                    </li>
                    <li>
                        <CampaignIcon />  <span>Campaings</span>
                    </li>
                    <li>
                        <ListAltIcon />  <span>Numbers</span>
                    </li>
                    <li>
                        <InsertChartIcon />  <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon /> <span>Notifications</span>
                    </li>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon />  <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon /> <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon /> <span>Settings</span>
                    </li>
                    <li>
                        <AccountCircleOutlinedIcon />  <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon />  <span>Log out </span>
                    </li>
                </ul>
            </div>
            <div className="bottom">color option</div>
        </aside>
    );
};

export default Sidebar;