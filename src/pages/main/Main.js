import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topBar/TopBar';
import FirebaseApp from '../../firebase/FirebaseApp';


const Main = () => {
    const auth = getAuth(FirebaseApp);
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            console.log('Page is loading')
        } else {
            if (!user) {
                toast("Please login!");
                navigate("/login", { replace: true });
            } else {
                console.log('Logged in')
                console.log(user.email);
            }
        }
    }, [loading, user, navigate]);
    return (
        <div>
            {user &&
                <section>
                    <TopBar />
                    <div className="container">
                        <Sidebar />
                        <Outlet />
                    </div>
                </section>}
        </div>
    );
};

export default Main;