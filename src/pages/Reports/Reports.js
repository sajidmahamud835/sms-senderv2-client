import React, { useEffect } from 'react';
// import './Reports.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';
import PrivateRoute from '../../PrivateRoute/PrivateRoute/PrivateRoute';
import { toast } from 'react-toastify';
const getSMSLogs = (id) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/sms/logs`;
    return fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
    })
        .then((res) => {
            // console.log(res.status);
            if (res.status === 403 || res.status === 401) {
                toast.error("UnAuthorized access ");
            } else {
                return res.json();
            }
        })
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
    const [dataLoading, setDataLoading] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setDataLoading(true);
        getSMSLogs().then((data) => {
            setSmsLogs(data?.messages);
            console.log(data);
            setDataLoading(false);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
        , []);

    //spit out the sms logs for pagination
    const smsLogsPagination = () => {
        const start = (page - 1) * 10;
        const end = start + 10;
        return smsLogs.slice(start, end);
    }


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
                                            {(loading || dataLoading) ? (
                                                <tr>
                                                    <td>Loading...</td>
                                                </tr>
                                            ) : (
                                                smsLogsPagination()?.map((smsLog) => (
                                                    <tr key={smsLog.sid}>
                                                        <td>{smsLog.to}</td>
                                                        <td>{smsLog.from}</td>
                                                        <td>{smsLog.body}</td>
                                                        <td>{smsLog.status === 'delivered' ? <span className='bg-primary text-light rounded p-1 m'>{smsLog.status}</span> : <span className='bg-info text-light rounded p-1 m'>{smsLog.status}</span>}</td>
                                                        <td>{smsLog.dateSent}</td>
                                                        <td>{smsLog.price} {smsLog.priceUnit}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="pagination">
                                        {page > 1 && <button className="btn btn-primary" onClick={() => setPage(page - 1)}>Previous</button>}
                                        <button className="btn btn-outline-dark ms-1" > Current Page: {page} </button>
                                        {smsLogsPagination().length > 1 && <button className="btn btn-primary ms-1" onClick={() => setPage(page + 1)}>Next</button>}
                                    </div>

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
