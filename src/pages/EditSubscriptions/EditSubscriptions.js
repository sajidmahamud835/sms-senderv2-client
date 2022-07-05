import React from 'react';
import './EditSubscriptions.css'
import { useParams } from 'react-router-dom';
const EditSubscriptions = () => {
    let { Id } = useParams();
    return (
        <div className='editSubscriptions'>
            <h1>EditSubscriptions {Id} </h1>
        </div>
    );
};

export default EditSubscriptions;