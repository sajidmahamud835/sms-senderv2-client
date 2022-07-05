import React, { useEffect } from 'react';
import { useState } from 'react';
import './ApiAnalytics.css'
const ApiAnalytics = () => {
    const [messages, setMessages] = useState([])
    // const allDataIsComing = (id) => {
    //     fetch(`http://localhost:4000/allAPIData/${id}`)
    //         .then(res => res.json())
    //         .then(data => setMessages([...messages, data]))
    // }

    // for (let index = 0; index < 20; index++) {
    //     allDataIsComing(index)
    // } 

    return (
        <div className='ApiAnalyticsContainer'>
            <h1> ApiAnalytics {messages.length}</h1>
        </div>
    );
};

export default ApiAnalytics;