// login.js
import logo from './logo.svg';
import React, { Component, useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
 
//    import {List,InputItem,WingBlank,WhiteSpace, Button} from 'antd-mobile'
//    import Logo from '../../components/logo/logo'
const DEFAULT_VALUES = {
    usermail: '',
    password: '',
};

const useLogin = () => {
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const displayLoginSuccessMessage = () => {
        setLoginSuccess('Successfully logged in');
        setTimeout(() => {
            setLoginSuccess(null);
        }, 3000);
    };
    const login = (event, loginParams, setLoginParams) => {
        event.preventDefault();
        setLoginError(null);
        if (loginParams.usermail === '') {
            console.error('Missing email, this field is required');
            return;
        }
        axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, loginParams)
            .then((response) => {
                displayLoginSuccessMessage();
                setLoginParams(DEFAULT_VALUES);
                // const navigate= useNavigate();
                // useEffect(()=>{
                //     setTimeout(()=>{
                //         navigate('/films', {replace:true});
                //     }, 3000);
                // }, []);
                // localStorage.setItem("userMail",loginParams.usermail);
                // localStorage.setItem("uid", response.data.uid);
                // localStorage.setItem("isLogin", true);
                // localStorage.setItem("name", response.data.name);
                sessionStorage.setItem("JWTtoken", response.data.token);
                sessionStorage.setItem("JWTrefresh", response.data.refresh);
                console.log(response);
                window.location.href=`/userspace`;
            })
            .catch((error) => {
                setLoginError('An error occured while logging in.');
                console.error(error);
            });
    };
    return { login, loginError, loginSuccess };
}


function Login() {
    const [loginParams, setLoginParams] = useState(DEFAULT_VALUES);
    const { login, loginError, loginSuccess } = useLogin()
    return (
        <div className="page-login">
            {/* Enter Movie Name */}
            <form onSubmit={(event) => login(event, loginParams, setLoginParams)}>
                <img src={logo} className="App-logo" alt="logo" />

                <div className="login-row">
                    <div className="input-what">
                        user mail
                    </div>
                    <div className="input-content">
                        <input
                            placeholder="xxx@yyy.mail"
                            value={loginParams.usermail}
                            onChange={(event) =>
                                setLoginParams({ ...loginParams, usermail: event.target.value })
                            }
                        />
                    </div>


                </div>
                <div className="login-row">
                    < div className="input-what">
                        password
                    </div>
                    <div className="input-content">
                        <input
                            value={loginParams.password}
                            onChange={(event) =>
                                setLoginParams({ ...loginParams, password: event.target.value })
                            }
                        />
                    </div>


                </div>
                <button className="login-button" type="submit" >
                    Login
                </button>
                {/* <p>{loginParams.usermail}</p>
            <p>{loginParams.password}</p> */}
            </form>
            {loginSuccess !== null && (
                <div className="login-success">{loginSuccess}</div>
            )}
            {loginError !== null && (
                <div className="login-error">{loginError}</div>
            )}
        </div>
    );

    /*
    *     去注册
    * */
    // handleGoRegister() {
    //     this.props.history.push('/register');
    // }
}

export default Login