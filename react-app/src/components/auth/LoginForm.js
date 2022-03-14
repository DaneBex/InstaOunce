import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from "../../store/session"

import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let loginButton;
  const imgvar = ['https://www.trendmut.com/wp-content/uploads/2018/02/instagram-notifies-about-screenshots.jpg',
    'https://img.utdstc.com/screen/d62/dad/d62dad32a4f59acc828c8c08c782e56d15cdeb391fb79ffca662e2ef6cb39f5a:800',
    'https://pbs.twimg.com/media/EDqG4czWkAAfY2W?format=jpg&name=large',
    'https://preview.redd.it/qc3vrsu6w5j21.jpg?auto=webp&s=d64180ea77152d18ef74fe4661c5439aa5868837']
  //let count = 1;
  const [myCount, setCount] = useState(0)
  let img_display = imgvar[myCount]

  useEffect(() => {
    const interval = setInterval(() => {
      if (myCount === 3) {
        setCount(0)
      }
      else {
        setCount(myCount + 1)
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [myCount]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (email && password) {
    loginButton = <button className='login-button' type='submit'>Login</button>
  } else {
    loginButton = <p className='login-button-nothing'>Login</p>
  }

  if (user) {
    return <Redirect to='/' />;
  }

  const demoUser = e => {
    return dispatch(sessionActions.login('demo@aa.io', 'password'))
  }

  return (
    <>
      <h3 className='ourlinks'>
        Developed by:
        <a href="https://github.com/brandonvicc">
          Brandon Vicchiollo
        </a>
        <a href="https://github.com/171cas">
          Cesar Solano
        </a>
        <a href="https://github.com/DaneBex">
          Dane Becker
        </a>
        <a href="https://github.com/hamletv">
          Hamlet Villa
        </a>
      </h3>
      <div className='login-signup-main'>
        <div className='login-signup-article'>
          <div className='is-image-login'>
            <img className='login-pic' src='https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png' />
            <img className='inside-pic' src={img_display} />

          </div>
          <div className='col'>
            <div className='not-image-login'>
              <form className='main-login-form' onSubmit={onLogin}>
                <h1 className='logo-form'>InstaOunce</h1>
                <div className='form'>
                  <div>
                    {errors.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                  <div className='input'>
                    <input
                      name='email'
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={updateEmail}
                    />
                  </div>
                  <div className='input'>
                    <input
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                  {loginButton}
                  <p>------------ OR ------------</p>
                  <p onClick={demoUser} className='demo-user'>Demo User</p>
                </div>
              </form>
            </div>
            <div className='main-signup-form'>
              <p>Don't have an account? <NavLink to='/sign-up'>Sign Up</NavLink></p>
            </div>

            <div className='gta'>
              <p>Get the app.</p>
            </div>
            <div className='get-app'>
              <div>
                <img src="as.svg" />
                <img src="ps.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
