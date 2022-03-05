
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faPlusMinus, faUser } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux';
import * as sessionActions from '../store/session';

import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const [profileClicked, setProfileClicked] = useState(false)

  const openMenu = () => {
    if (profileClicked) return;
    setProfileClicked(true);
  };

  useEffect(() => {
    if (!profileClicked) return;

    const closeMenu = () => {
      setProfileClicked(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [profileClicked]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <nav>
      <ul id='nav-bar'>
        <div id='nav-logo-div'>
        <li >
          <NavLink to='/' exact={true} className='instaOunce-name' activeClassName='active'>
            InstaOunce
          </NavLink>
        </li>
        </div>
        <div id='nav-not-logo'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
            <FontAwesomeIcon  className='houseIcon' icon={faHouse} />
            </NavLink>
          </li>
        <li>
          <button id='create-post-button'>
          <FontAwesomeIcon id='create-post-icon' icon={faPlusMinus} />
          </button>
        </li>
        <li>
          {sessionUser?.profile_pic &&
          <img onClick={openMenu} className='profile-pic' src={sessionUser.profile_pic}></img>
          }
          {profileClicked &&
          <div className='showmenu-navbar'>
            <NavLink className='navbar-show-profile go-to-profile' to={`/${sessionUser.username}`} exact={true} activeClassName='active'>
            <FontAwesomeIcon className='userIcon' icon={faUser} />
            <p>Profile</p>
            </NavLink>
            <p onClick={logout} className='navbar-showmenu-logout'>Log Out</p>
            </div>
            }
        </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;