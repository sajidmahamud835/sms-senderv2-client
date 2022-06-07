import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Campaign from "./pages/campaign/Campaign";
import NewCampaign from "./pages/newCampaign/NewCampaign";
import Sms from "./pages/sms/Sms";
import Login from "./pages/auth/login/Login";
import Main from "./pages/main/Main";
import CampaignList from "./pages/campaignList/CampaignList";
import ExcelToCSV from "./components/ExcelToCSV/ExcelToCSV";
import ManageSubscriptions from "./pages/ManageSubscriptions/ManageSubscriptions";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
import MyCampaigns from "./pages/GeneralUserPages/MyCampaigns/MyCampaigns";
import MyTemplates from "./pages/GeneralUserPages/MyTemplates/MyTemplates";
import MyContacts from "./pages/GeneralUserPages/MyContacts/MyContacts";
import MySubscription from "./pages/GeneralUserPages/MySubscription/MySubscription";
import MyReports from "./pages/GeneralUserPages/MyReports/MyReports";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Should I delete it */}
      <Route path="/loginfsdfsdf" element={<Login />}></Route>

      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="" element={ <Main /> }>
        <Route path="" element={<Home />} />
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/sms" element={<Sms />}></Route>
        <Route path="/excel-to-csv" element={<ExcelToCSV />}></Route>
        <Route path="/user/:userId" element={<User />}></Route>
        <Route path="/newUser" element={<NewUser />}></Route>
        <Route path="/campaigns" element={<CampaignList />}></Route>
        <Route path="/campaign/:campaignId" element={<Campaign />}></Route>
        <Route path="/new-campaign" element={<NewCampaign />}></Route>
        <Route path="/manage-subscriptions" element={<ManageSubscriptions />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
        {/* This Route For General User */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/myCampaigns" element={<MyCampaigns />}></Route>
        <Route path="/myTemplates" element={<MyTemplates />}></Route>
        <Route path="/myContacts" element={<MyContacts />}></Route>
        <Route path="/mySubscription" element={<MySubscription />}></Route>
        <Route path="/myReports" element={<MyReports />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Route>
    </Routes>

  );
}

export default App;
