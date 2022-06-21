import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topBar/TopBar';
import UseFirebase from '../../Hooks/UseFirebase';


const Main = () => {
    <div>
        <section>
            <TopBar />
            <div className="container">
                <Sidebar />
                <Outlet />
            </div>
        </section>
    </div>
};

export default Main;