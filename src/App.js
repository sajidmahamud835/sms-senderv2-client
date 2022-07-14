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
import Settings from "./pages/Settings/Settings";
import VerifyRoute from "./verification/VerifyRoute";
import Verify from "./verification/Verify";
import VerifyProfile from "./verification/VerifyProfile";
import MessageTemplates from "./pages/MessageTemplates/MessageTemplates";
import AdminRoute from "./PrivateRoute/AdminRoute/AdminRoute";
function App() {
  return (
    <>
      <Routes>
        {/* Should I delete it */}
        {/* <Route path="/loginfsdfsdf" element={<Login />}></Route> */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/verify-profile" element={<VerifyProfile />}></Route>
        <Route path="" element={<PrivateRoute><VerifyRoute><Main /></VerifyRoute></PrivateRoute>}>
          <Route path="" element={<Home />} />
          <Route path="/users" element={<AdminRoute><UserList /></AdminRoute>}></Route>
          <Route path="/sms" element={<AdminRoute><Sms /></AdminRoute>}></Route>
          <Route path="/excel-to-csv" element={<AdminRoute><ExcelToCSV /></AdminRoute>}></Route>
          {/* <Route path="/all-lists" element={<AdminRoute><AllList /></AdminRoute>}></Route> */}
          {/* <Route path="/edit-all-lists/:Id" element={<AdminRoute><EditAllList /></AdminRoute>}></Route> */}
          <Route path="/edit-all-lists/:Id" element={<AdminRoute><EditAllList02 /></AdminRoute>}></Route>
          <Route path="/user/:userId" element={<AdminRoute><User /></AdminRoute>}></Route>
          <Route path="/newUser" element={<AdminRoute><NewUser /></AdminRoute>}></Route>
          <Route path="/campaigns" element={<AdminRoute><CampaignList /></AdminRoute>}></Route>
          <Route path="/campaign/:Id" element={<AdminRoute><Campaign /></AdminRoute>}></Route>
          <Route path="/new-campaign" element={<AdminRoute><NewCampaign /></AdminRoute>}></Route>
          <Route path="/manage-subscriptions" element={<AdminRoute><ManageSubscriptions /></AdminRoute>}></Route>
          <Route path="/all-contacts-lists" element={<AdminRoute><AllList /></AdminRoute>}></Route>
          <Route path="/edit-subscriptions/:Id" element={<AdminRoute><EditSubscriptions /></AdminRoute>}></Route>
          <Route path="/new-subscriptions" element={<AdminRoute><NewSubscriptions /></AdminRoute>}></Route>
          <Route path="/manageAPI" element={<AdminRoute><ManageAPI /></AdminRoute>}></Route>
          <Route path="/apiAnalytics" element={<AdminRoute><ApiAnalytics /></AdminRoute>}></Route>
          <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>}></Route>
          <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>}></Route>
          {/* This Route For General User */}
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/myCampaigns" element={<MyCampaigns />}></Route>
          <Route path="/myTemplates" element={<MyTemplates />}></Route>
          <Route path="/myContacts" element={<MyContacts />}></Route>
          <Route path="/mySubscription" element={<MySubscription />}></Route>
          <Route path="/templates" element={<MessageTemplates />}></Route>
          <Route path="/myReports" element={<MyReports />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
