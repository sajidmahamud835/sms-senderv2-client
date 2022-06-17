import React from 'react';
import { useParams } from 'react-router-dom';
import './EditAllList.css'
const EditAllList = () => {
    let { Id } = useParams();
    return (
        <div className='EditAllListContainer'>
            <h1>EditAllList {Id}</h1>
        </div>
    );
};

export default EditAllList;