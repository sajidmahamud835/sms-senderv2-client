import { getAuth } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner';
import FirebaseApp from '../../../firebase/FirebaseApp';


const auth = getAuth(FirebaseApp);

const Login = () => {
    const [validated, setValidated] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [errorText, setErrorText] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        signInError,
    ] = useSignInWithEmailAndPassword(auth);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // reset password
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);

    if (loading) {
        <LoadingSpinner />;
    }

    // BigB0ss135@#

    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        setErrorText('');

        signInWithEmailAndPassword(email, password);
    };
    if (user) {
        toast("Logged In");

        navigate(from, { replace: true });
    }
    if (sending) {
        <LoadingSpinner />;
    }
    const handleResetPassword = async () => {
        const email = emailRef.current.value;

        if (email) {
            await sendPasswordResetEmail(email);
            toast('Email Sended');
            setErrorText('');
        }
        else {
            setErrorText('Please enter your email address');
        }
    };
    return (
        <section className='login'>
            <div className='mx-auto my-5 px-4 py-5 shadow rounded' style={{ maxWidth: '500px' }}>
                <h3 className='text-center'>Login</h3>
                <Form noValidate validated={validated} onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required ref={emailRef} type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required ref={passwordRef} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid 6-digit password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <p className='mt-3'> <small onClick={handleResetPassword} className='text-primary' style={{ cursor: 'pointer' }}>Reset Password</small></p>
                    {errorText && <p className="alert alert-danger" role="alert">Error: {errorText}</p>}
                    {signInError && <p className="alert alert-danger" role="alert">Error: {signInError?.message}</p>}
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Login;