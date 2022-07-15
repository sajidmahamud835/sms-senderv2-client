import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import SmsIcon from '@mui/icons-material/Sms';
import UseFirebase from '../../../Hooks/UseFirebase';
import './LoginPage.css';
import useToken from '../../../Hooks/useToken';

const LoginPage = () => {
    const { handleGoogleSignIn, logInEmailPassword, registerByEmailPass, error, user } = UseFirebase();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [regBtn, setRegBtn] = useState(false);
    const [logBtn, setLogBtn] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [errorMassage, setErrorMassage] = useState("");
    const [emailErrorMassage, setEmailErrorMassage] = useState("");
    const [passwordErrorMassage, setPasswordErrorMassage] = useState("");
    const [nameErrorMassage, setNameErrorMassage] = useState("");
    const [showError, setShowError] = useState("");
    // adding jwt token hook
    useToken(user);


    const location = useLocation();
    let navigate = useNavigate();
    const redirect_uri = location.state?.from || '/sms';
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePass = (e) => {
        setPassword(e.target.value);
    };
    const showRegBtn = () => {
        setLogBtn(false);
        setRegBtn(true);
    };
    const showLogBtn = () => {
        setRegBtn(false);
        setLogBtn(true);
    };
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then((result) => {
                navigate(redirect_uri);
            });

    };
    // Add conditions
    useEffect(() => {
        // for filling the input form
        if (email !== "" && password !== "" && email !== undefined && password !== undefined) {
            setErrorMassage(false);
        } else {
            setErrorMassage("Please fill in the form.");
        }
        const regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        const regexPassword = new RegExp('^.{6,}$');

        // for email
        if (!regexEmail.test(email)) {
            setEmailErrorMassage("Enter valid email.");
        } else {
            setEmailErrorMassage(false);
        }
        //for password
        if (!regexPassword.test(password)) {
            setPasswordErrorMassage("Invalid password.");
        } else {
            setPasswordErrorMassage(false);
        }
        // disable btn
        if (errorMassage || emailErrorMassage || passwordErrorMassage || nameErrorMassage) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        // for user name
        if (regBtn) {
            if (name === undefined || name === "") {
                setNameErrorMassage("Inter your name.");
            } else {
                setNameErrorMassage(false);
            }
        } else {
            setNameErrorMassage(false);
        }
    }, [email, logInEmailPassword, password, disabled, errorMassage, emailErrorMassage, passwordErrorMassage, nameErrorMassage, name, regBtn]);


    // firebase error condition
    useEffect(() => {
        setShowError(false);
    }, [email, name, password]);

    const handleReg = () => {
        if (error) {
            setShowError(error);
        }
        if (disabled === false) {
            registerByEmailPass(email, password, name);
            // console.log(email, password, name)
        }
    };
    useEffect(() => {
        if (error) {
            setShowError(error);
        }
    }, [error]);
    const handleLogIn = () => {

        if (disabled === false) {
            logInEmailPassword(email, password);
            // console.log(email, password)
        }

    };
    return (
        <div id='logInPage'>
            <div>
                <div id="login-box">
                    <div className="left">
                        <h1> Log In</h1>
                        {regBtn && (<input type="text" name="name" placeholder="Full Name" onChange={handleName} />)}
                        <input type="text" name="email" placeholder="E-mail" onChange={handleEmail} />
                        <input type="password" name="password" placeholder="Password" onChange={handlePass} />

                        {
                            showError && <span className="text-danger">{showError}</span>
                        }
                        {
                            (errorMassage || emailErrorMassage || passwordErrorMassage || nameErrorMassage) && <><span className="text-danger">{errorMassage || emailErrorMassage || passwordErrorMassage || nameErrorMassage}</span> <br /></>
                        }
                        {logBtn && (<input type="submit" name="signup_submit" value="Log in" disabled={disabled} onClick={handleLogIn} />)}
                        {regBtn && (<input type="submit" name="signup_submit" value="Registration" disabled={disabled} onClick={handleReg} />)}
                    </div>

                    <div className="right">
                        <span className="loginwith">New here<br />just Sign up</span>
                        <SmsIcon style={{ fontSize: '100px', color: 'orangeRed' }} />

                        {
                            logBtn && (<button className="social-signin bg-dark facebook" onClick={showRegBtn}> Sign Up with Email</button>)
                        }
                        {
                            regBtn && (<button className="social-signin bg-dark facebook" onClick={showLogBtn}>  LOG In </button>)
                        }
                    </div>
                    <div className="or">OR</div>
                </div>
            </div>

        </div >
    );
};

export default LoginPage;