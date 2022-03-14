import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session"

import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePic, setProfilePic] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let signUpButton;

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profilePic));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value)
  }

  if (username && email && password && repeatPassword && (password === repeatPassword) && profilePic) {
    console.log('\n\n\n\n\n\n\n\n', password)
    console.log('\n\n\n\n\n\n\n\n', repeatPassword)
    signUpButton = <button className='signup-button' type='submit'>Sign up</button>
  } else {
    signUpButton = <p className='signup-button-nothing'>Sign up</p>
  }

  if (user) {
    return <Redirect to='/' />;
  }

  const demoUser = e => {
    return dispatch(sessionActions.login('demo@aa.io', 'password'))
  }

  return (
    <div className='main-body'>
      <div className='main-box'>
        <h1 className='logo-form'>InstaOunce</h1>
        <h2>Sign up to see photos and videos <br />from your friends.</h2>
        <button onClick={demoUser} className='signup-button'>Log in with Demo</button>
        <p>------------ OR ------------</p>
        <form
          onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='input'>
            <input
              placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
          </div>
          <div className='input'>
            <input
              placeholder='Email'
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div className='input'>
            <input
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div className='input'>
            <input
              placeholder='Repeat Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='input'>
            <input
              placeholder='Profile Picture Link'
              type='text'
              name='profile_pic'
              onChange={updateProfilePic}
              value={profilePic}
              required={true}
            ></input>
          </div>
          {signUpButton}
        </form>
      </div>
      <div className='main-signup-form'>
        <p>Have an account? <NavLink to='/login'>Log in</NavLink></p>
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
  );
};

export default SignUpForm;

{/* <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form> */}
