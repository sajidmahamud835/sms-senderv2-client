import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/Topbar';
import UseFirebase from '../../Hooks/UseFirebase';


const Main = () => {

    // const { user, loading, error } = UseFirebase();
    // let navigate = useNavigate();

    // useEffect(() => {
    //     if (loading) {
    //         console.log('Page is loading')
    //     } else {
    //         if (!user) {
    //             toast("Please login!");
    //             navigate("/login", { replace: true });
    //         } else {
    //             console.log('Logged in')
    //             console.log(user?.email);
    //         }
    //     }
    // }, [loading, user, navigate]);
    // console.log(user)
    return (
        <div>
            <section>
                < TopBar />
                <div className="container">
                    <Sidebar />
                    <Outlet />
                </div>
            </section>
        </div >
        // <div>
        //     {user &&
        //         <section>
        //             <TopBar />
        //             <div className="container">
        //                 <Sidebar />
        //                 <Outlet />
        //             </div>
        //         </section>}
        // </div>
    );
};

export default Main;