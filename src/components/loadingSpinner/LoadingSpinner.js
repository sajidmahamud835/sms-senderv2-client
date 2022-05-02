import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <div className='d-flex align-items-center' style={{ height: '90vh' }}>
            <Spinner animation="border" variant="primary" className='d-block mx-auto' role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;