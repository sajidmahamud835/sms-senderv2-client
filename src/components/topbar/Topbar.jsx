import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
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
          <img src="https://media-exp1.licdn.com/dms/image/sync/C5627AQHDoC7cGiF_FQ/articleshare-shrink_480/0/1650973331366?e=2147483647&v=beta&t=dzC8F2yHDQMMfWhCXgE0Pa5V86uta_ULCFF5KKklq1M" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
