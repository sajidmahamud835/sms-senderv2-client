import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import SmsIcon from '@mui/icons-material/Sms';
import UseFirebase from '../../../Hooks/UseFirebase';
import './LoginPage.css'

const LoginPage = () => {
    const { handleGoogleSignIn, logInEmailPassword, registerByEmailPass, error } = UseFirebase();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [regBtn, setRegBtn] = useState(false);
    const [logBtn, setLogBtn] = useState(true);
    const location = useLocation();
    let navigate = useNavigate();
    const redirect_uri = location.state?.from || '/sms';

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
    }
    const showRegBtn = () => {
        setLogBtn(false)
        setRegBtn(true)
    }
    const showLogBtn = () => {
        setRegBtn(false)
        setLogBtn(true)
    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then((result) => {
                navigate(redirect_uri);
            })

    }




    const handleReg = () => {
        console.log(email, password, name,)
        registerByEmailPass(email, password, name,)
    }
    const handleLogIn = () => {
        console.log(email, password)
        logInEmailPassword(email, password)
    }
    const text = 'auth/wrong-password'
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
                            error === text ? <span className="text-danger hidden">Wrong Password</span> : <span className="text-white hidden" >Wrong Password</span>
                        }
                        {logBtn && (<input type="submit" name="signup_submit" value="Log in" onClick={handleLogIn} />)}
                        {regBtn && (<input type="submit" name="signup_submit" value="Registration" onClick={handleReg} />)}
                    </div>

                    <div className="right">
                        <span className="loginwith">New here<br />just Sign up</span>
                        <SmsIcon style={{ fontSize: '100px', color: 'orangeRed'}} />

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