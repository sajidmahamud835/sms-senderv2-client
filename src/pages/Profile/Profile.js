import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import './Profile.css'
import React from 'react';
import { userData } from "../../dummyData";

const Profile = () => {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">My Profile</h1>
            </div>
            <div className="profileContainer">
                <div>
                    <img
                        src="https://lh3.googleusercontent.com/a-/AOh14GgSRZ8SdC8aBlKjsICLkYukQBzYo85fUT0V_ZdG2A=s96-c"
                        alt=""
                        style={{ width: '200px', height: '200px' }}
                        className="userShowImg"
                    />
                    <div>
                        <h2>Samsul Alma</h2>
                        {/* <h2>{user?.displayName}</h2> */}
                        <h4>Software Engineer</h4>
                        {/* <h3>{user?....}</h3> */}
                    </div>
                </div>
                <div className="detailsContainer">
                    <h4 className="detailsHeadings">Account Details</h4>
                    <div>
                        <PermIdentity />
                        <span className="details">annabeck99</span>
                    </div>
                    <div>
                        <CalendarToday />
                        <span className="details">10.12.1999</span>
                    </div>
                    <h4 className="detailsHeadings">Contact Details</h4>
                    <div >
                        <PhoneAndroid />
                        <span className="details">+1 123 456 67</span>
                    </div>
                    <div  >
                        <MailOutline />
                        <span className="details">annabeck99@gmail.com</span>
                    </div>
                    <div  >
                        <LocationSearching />
                        <span className="details" >New York | USA</span>
                    </div>
                </div>
            </div>
            {/* <div className="userShow">
                <div className="userShowTop">
                    <img
                        src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                        <h6 className="userShowUsername">Anna Becker</h6>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon" />
                        <span className="userShowInfoTitle">annabeck99</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className="userShowIcon" />
                        <span className="userShowInfoTitle">10.12.1999</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon" />
                        <span className="userShowInfoTitle">+1 123 456 67</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className="userShowIcon" />
                        <span className="userShowInfoTitle">annabeck99@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon" />
                        <span className="userShowInfoTitle">New York | USA</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Profile;

