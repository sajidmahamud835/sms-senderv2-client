import React from 'react';
import useSidebarToggles from '../../Hooks/useSidebarToggles';
import Topbar from '../topbar/Topbar';

const LayOut = ({children}) => {
    const [small, close, setClose] = useSidebarToggles()

    return (
        <>
        <Topbar small={small} setClose={setClose} close={close} />
        <div className = "container">
            {children}
        </div>
        </>
    );
};

export default LayOut;