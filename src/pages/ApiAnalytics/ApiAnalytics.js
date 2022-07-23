import React, { useEffect } from 'react';
import { useState } from 'react';
import './ApiAnalytics.css';
import Chart from "../../components/Chart/Chart";
import { useNavigate } from 'react-router-dom';
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import { Message } from '@material-ui/icons';
const ApiAnalytics = () => {
    const [smsLogs, setSmsLogs] = useState([]);
    const navigate = useNavigate();
    const [deliveredSms, setDeliveredSms] = useState(0);
    const [undeliveredSms, setUndeliveredSms] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/sms/logs/month`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => {
                if (res.status === 403 || res.status === 401) {
                    navigate('/login');
                } else {
                    return res.json();
                }
            }
            )
            .then((data) => {
                setSmsLogs(data.report);
                setDeliveredSms(data.statusReport[0]['SMS Sent']);
                setUndeliveredSms(data.statusReport[1]['SMS Sent']);
            }
            );
    }, [navigate]);

    return (
        <div className='ApiAnalyticsContainer'>
            <h1>Monthly Api Analytics</h1>
            <FeaturedInfo data={[
                {
                    id: 1,
                    name: "Delivered",
                    value: deliveredSms,
                    icon: <Message />,
                },
                {
                    id: 2,
                    name: "Undelivered",
                    value: undeliveredSms,
                    icon: <Message />,
                },
                {
                    id: 3,
                    name: "Total",
                    value: deliveredSms + undeliveredSms,
                    icon: <Message />,
                },
            ]} />
            {smsLogs.length > 0 ? <Chart data={smsLogs} title="Monthly API Analytics" grid dataKey="SMS Sent" /> : <div className='noData'>Loading Monthly API Analytics...</div>}
            <button onClick={() => navigate('/reports')} className="btn btn-primary">View SMS Reports</button>
            <button onClick={() => navigate('/campaigns')} className="btn btn-success ms-4">View All Campaigns</button>


        </div>
    );
};

export default ApiAnalytics;