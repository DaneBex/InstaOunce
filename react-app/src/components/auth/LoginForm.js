import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let loginButton;

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

  return (
    <div className='login-signup-main'>
    <div className='login-signup-article'>
      <div className='is-image-login'>
      <img className='login-pic' src='https://i5.walmartimages.com/asr/1c1e8882-6647-4f95-b6da-39183898618c.0b325bb079e2cd662542f5c50717c54a.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF' />
      </div>
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
        <label>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='input'>
        <label>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
          {loginButton}
      </div>
    </form>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;
