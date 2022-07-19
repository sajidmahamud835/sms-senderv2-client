import React from 'react';
import { useNavigate } from 'react-router-dom';

const CornJobsRun = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    React.useEffect(() => {
        window.location.href = `${serverUrl}/corns/campaign/`;
    });


    return (
        <div>

        </div>
    );


};

export default CornJobsRun;