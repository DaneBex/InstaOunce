import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to='/login' />

    return (
        <h1>Hello</h1>
    )
}

export default HomePage
