import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
          <p className="user-profile-header">{user.username}</p>
          <div className="user-profile-stats">
            <div>{user.follower} posts</div>
            <div>{user.followers} follows</div>
            <div>{user.followers} following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
