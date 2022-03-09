import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "./User.css";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      console.log(user);
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-info-container">
        <div className="user-profile-image-container">
          <img className="user-profile-pic" src={user.profile_pic} />
        </div>
        <div className="user-profile-info-content">
          <div className="user-profile-header-container">
            <p className="user-profile-header">{user.username}</p>
            <NavLink to={"/"}>
              <button className="user-profile-edit-btn">Edit</button>
            </NavLink>
          </div>
          <div className="user-profile-stats">
            <div>
              <strong>{user.followers?.length}</strong> posts
            </div>
            <div>
              <strong>{user.followers?.length}</strong> follows
            </div>
            <div>
              <strong>{user.followers?.length}</strong> following
            </div>
          </div>
        </div>
      </div>
      <div className="user-profile-post-container">
        <p id="user-profile-post-header">
          <FontAwesomeIcon id="user-profile-post-icon" icon={faClipboard} />{" "}
          Posts
        </p>
      </div>
    </div>
  );
}
export default User;
