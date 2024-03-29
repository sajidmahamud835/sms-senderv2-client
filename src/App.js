import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleCampaign from "./pages/SingleCampaign/SingleCampaign";
import CampaignList from "./pages/CampaignList/CampaignList";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import ManageAPI from "./pages/ManageAPI/ManageAPI";
import NewCampaign from "./pages/NewCampaign/NewCampaign";
import NewUser from "./pages/CreateNewUser/CreateNewUser";
import SendQuickMessage from "./pages/SendQuickMessage/SendQuickMessage";
import User from "./pages/SingleUser/SingleUser";
import UserList from "./pages/AllUserList/AllUserList";
import NewContacts from "./components/NewContacts/NewContacts";
import ManageSubscriptions from "./pages/ManageSubscriptions/ManageSubscriptions";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute/PrivateRoute";
import ApiAnalytics from "./pages/ApiAnalytics/ApiAnalytics";
import EditSubscriptions from "./pages/EditSubscriptions/EditSubscriptions";
import ContactLists from "./pages/ContactLists/ContactLists";
import ViewContacts from "./components/ViewContacts/ViewContacts";
import NewSubscriptions from "./pages/NewSubscriptions/NewSubscriptions";
import Settings from "./pages/Settings/Settings";
import VerifyRoute from "./verification/VerifyRoute";
import Verify from "./verification/Verify";
import VerifyProfile from "./verification/VerifyProfile";
import MessageTemplates from "./pages/MessageTemplates/MessageTemplates";
import AdminRoute from "./PrivateRoute/AdminRoute/AdminRoute";
import CornJobsRun from "./pages/CornJobsRun/CornJobsRun";
import UpdateCampaign from "./pages/UpdateCampaign/UpdateCampaign";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/subscription" element={<Verify />}></Route>
        <Route path="/updateProfile" element={<VerifyProfile />}></Route>
        <Route path="/cornjobs" element={<CornJobsRun />}></Route>

        <Route path="" element={<PrivateRoute><VerifyRoute><Main /></VerifyRoute></PrivateRoute>}>
          <Route path="" element={<Home />} />
          <Route path="/users" element={<AdminRoute><UserList /></AdminRoute>}></Route>
          <Route path="/sms" element={<SendQuickMessage />}></Route>
          <Route path="/user/:userId" element={<AdminRoute><User /></AdminRoute>}></Route>
          <Route path="/newUser" element={<AdminRoute><NewUser /></AdminRoute>}></Route>
          <Route path="/subscriptions" element={<AdminRoute><ManageSubscriptions /></AdminRoute>}></Route>
          <Route path="/subscriptions/:Id" element={<AdminRoute><EditSubscriptions /></AdminRoute>}></Route>
          <Route path="/new-subscriptions" element={<AdminRoute><NewSubscriptions /></AdminRoute>}></Route>
          <Route path="/manageAPI" element={<AdminRoute><ManageAPI /></AdminRoute>}></Route>
          <Route path="/apiAnalytics" element={<AdminRoute><ApiAnalytics /></AdminRoute>}></Route>
          <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>}></Route>
          <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>}></Route>
          <Route path="/campaigns" element={<CampaignList />}></Route>
          <Route path="/updateCampaign/:id" element={<UpdateCampaign />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/contacts" element={<ContactLists />}></Route>
          <Route path="/newContacts" element={<NewContacts />}></Route>
          <Route path="/contacts/:Id" element={<ViewContacts />}></Route>
          <Route path="/campaign/:Id" element={<SingleCampaign />}></Route>
          <Route path="/newCampaign" element={<NewCampaign />}></Route>
          <Route path="/templates" element={<MessageTemplates />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
