import React from 'react';
import useSidebarToggles from '../../Hooks/useSidebarToggles';
import Topbar from '../topbar/Topbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayOut = ({ children }) => {
    const [small, close, setClose] = useSidebarToggles();

    return (
        <>
            <ToastContainer />
            <Topbar small={small} setClose={setClose} close={close} />
            <div className="container">
                {children}
            </div>
        </>
    );
};

export default LayOut;