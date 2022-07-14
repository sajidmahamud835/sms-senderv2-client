import React, { useEffect } from 'react';
// import './Reports.css'
import { useState } from 'react';
import UseFirebase from '../../Hooks/UseFirebase';
import PrivateRoute from '../../PrivateRoute/PrivateRoute/PrivateRoute';

const getSMSLogs = (id) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/sms/logs`;
    return fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        }
        ).catch((error) => {
            console.log(error);
        }
        );
};


const Reports = () => {
    const { user, loading } = UseFirebase();
    const [error, setError] = useState(false);
    const [smsLogs, setSmsLogs] = useState([]);

    useEffect(() => {
        getSMSLogs().then((data) => {
            setSmsLogs(data.messages);
            console.log(data);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
        , []);


    return (
        <PrivateRoute>
            <div className="reports">
                <h1>Reports</h1>
                <div className="reportsContainer">
                    <div className="reportsItem">
                        <h2>SMS Logs</h2>
                        <p>
                            This is a list of all SMS messages sent by all user in this server.
                        </p>
                        <div className="reportsItemContainer">
                            <div className="reportsItemContent">
                                <div className="reportsItemContentHeader">
                                    <h3>All Messages</h3>
                                </div>
                                <div className="reportsItemContentBody">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>To</th>
                                                <th>From</th>
                                                <th>SMS Message</th>
                                                <th>SMS Status</th>
                                                <th>SMS Date</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td>Loading...</td>
                                                </tr>
                                            ) : (
                                                smsLogs.map((smsLog) => (
                                                    <tr key={smsLog.sid}>
                                                        <td>{smsLog.to}</td>
                                                        <td>{smsLog.from}</td>
                                                        <td>{smsLog.body}</td>
                                                        <td><span className='bg-primary text-light rounded p-1 m'>{smsLog.status}</span></td>
                                                        <td>{smsLog.dateSent}</td>
                                                        <td>{smsLog.price} {smsLog.priceUnit}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};
export default Reports;
