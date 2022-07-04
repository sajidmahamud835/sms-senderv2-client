import { Route, Routes } from "react-router-dom";
import "./App.css";
import Campaign from "./pages/campaign/Campaign";
import CampaignList from "./pages/campaignList/CampaignList";
import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import ManageAPI from "./pages/ManageAPI/ManageAPI";
import NewCampaign from "./pages/newCampaign/NewCampaign";
import NewUser from "./pages/newUser/NewUser";
import Sms from "./pages/sms/Sms";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
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
import ApiAnalytics from "./pages/ApiAnalytics/ApiAnalytics";
import EditSubscriptions from "./pages/EditSubscriptions/EditSubscriptions";
import AllList from "./pages/AllList/AllList";
import EditAllList02 from "./components/EditAllList02/EditAllList02";
import NewSubscriptions from "./pages/NewSubscriptions/NewSubscriptions";

function App() {
  return (
    <Routes>
      {/* Should I delete it */}
      {/* <Route path="/loginfsdfsdf" element={<Login />}></Route> */}
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="" element={<PrivateRoute><Main /></PrivateRoute>}>
        <Route path="" element={<Home />} />
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/sms" element={<Sms />}></Route>
        <Route path="/excel-to-csv" element={<ExcelToCSV />}></Route>
        <Route path="/all-lists" element={<AllList />}></Route>
        {/* <Route path="/edit-all-lists/:Id" element={<EditAllList />}></Route> */}
        <Route path="/edit-all-lists/:Id" element={<EditAllList02 />}></Route>
        <Route path="/user/:userId" element={<User />}></Route>
        <Route path="/newUser" element={<NewUser />}></Route>
        <Route path="/campaigns" element={<CampaignList />}></Route>
        <Route path="/campaign/:Id" element={<Campaign />}></Route>
        <Route path="/new-campaign" element={<NewCampaign />}></Route>
        <Route path="/manage-subscriptions" element={<ManageSubscriptions />}></Route>
        <Route path="/edit-subscriptions/:Id" element={<EditSubscriptions />}></Route>
        <Route path="/new-subscriptions" element={<NewSubscriptions />}></Route>
        <Route path="/manageAPI" element={<ManageAPI />}></Route>
        <Route path="/apiAnalytics" element={<ApiAnalytics />}></Route>
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
