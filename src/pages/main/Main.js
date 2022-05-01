import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';


const Main = () => {
    return (
        <div>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default Main;