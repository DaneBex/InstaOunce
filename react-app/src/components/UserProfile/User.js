import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import * as postActions from "../../store/post";
import { useDispatch, useSelector } from "react-redux";

import "./User.css";

function User() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.post.posts);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    dispatch(postActions.userPosts(userId));
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
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
        <div className="user-profile-posts-container">
          {userPosts?.map((post) => (
            <div key={post.id} className="user-profile-post-card">
              <div className="user-profile-post-info">
                <p>
                  <FontAwesomeIcon
                    className="user-profile-post-info-content"
                    icon={faHeart}
                  />{" "}
                  {post.likes}
                </p>
                <p>
                  <FontAwesomeIcon
                    className="user-profile-post-info-content"
                    icon={faComment}
                  />{" "}
                  {post.comments?.length}
                </p>
              </div>
              <img className="user-profile-post-img" src={post.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default User;
