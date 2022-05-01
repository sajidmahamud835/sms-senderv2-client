import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { getAuth, signOut } from "firebase/auth";
import FirebaseApp from "../../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Topbar() {
  const auth = getAuth(FirebaseApp);
  const logout = () => {
    signOut(auth);
  };
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="topbar">
      <nav className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">SMS Sender App</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div class="dropdown">
            <img src="https://media-exp1.licdn.com/dms/image/sync/C5627AQHDoC7cGiF_FQ/articleshare-shrink_480/0/1650973331366?e=2147483647&v=beta&t=dzC8F2yHDQMMfWhCXgE0Pa5V86uta_ULCFF5KKklq1M" alt="" className="topAvatar" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><span className="dropdown-item">Hello, {user.email} </span></li>
              <li>
                <hr />
              </li>
              <li><button class="dropdown-item" type="button">Profile</button></li>
              <li><button onClick={logout} class="dropdown-item" type="button">Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
