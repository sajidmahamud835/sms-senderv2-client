import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login/Login";
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

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />}></Route>
			<Route path="" element={<Main />}>
				<Route path="" element={<Home />} />
				<Route path="/users" element={<UserList />}></Route>
				<Route path="/user/:userId" element={<User />}></Route>
				<Route path="/newUser" element={<NewUser />}></Route>
				<Route path="/campaigns" element={<CampaignList />}></Route>
				<Route path="/campaign/:campaignId" element={<Campaign />}></Route>
				<Route path="/newcampaign" element={<NewCampaign />}></Route>
				<Route path="/sms" element={<Sms />}></Route>
				<Route path="/manageAPI" element={<ManageAPI />}></Route>
				<Route path="*" element={<Home />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
