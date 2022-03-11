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
import ViewPostModal from "../ViewPostModal";

import "./User.css";
import { followUser, populateUsers } from "../../store/user";

function User() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.post.posts);
  const usersObj = useSelector(state => state.user)
  const users = Object.values(usersObj)
  const user_id = useSelector(state => state.session.user?.id)
  const mainUser = useSelector(state => state.session.user)
  const [user, setUser] = useState({});
  const { userId } = useParams();
  let isFollowing = false
  let following;

  console.log('UserId:',userId,'User_id:', user_id)

  console.log(users)

  if (users) {
    let num = 0
    users.forEach(user => {
      if (user.followers) {
        user.followers.forEach(innerUser => {
          if (innerUser.id === parseInt(userId)) num++
        })
      }
    })
    following = num;
  }

  useEffect(() => {
    dispatch(populateUsers())
  }, [])

  const [viewPost, setViewPost] = useState(false)
  // const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    dispatch(postActions.userPosts(userId));
  }, [dispatch]);

  console.log(user)
  console.log(user_id)

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

  const makeFollow = () => {
    console.log('yes')
    dispatch(followUser(user_id, userId))
    dispatch(populateUsers())
    window.location.reload(false);
  }

  const closePost = () => {
    if (viewPost) setViewPost(false);
    else setViewPost(true);
  };
console.log(user.followers)

if (user.followers) {
  isFollowing = user.followers.find(user => user.id === user_id)
}

console.log(isFollowing)




  return (
    <div className="user-profile-container">
      <div className="user-profile-info-container">
        <div className="user-profile-image-container">
          <img className="user-profile-pic" src={user.profile_pic} />
        </div>
        <div className="user-profile-info-content">
          <div className="user-profile-header-container">
            <p className="user-profile-header">{user.username}</p>
            {user_id === parseInt(userId) &&
              <NavLink to={"/"}>
                <button className="user-profile-edit-btn">Edit</button>
              </NavLink>
            }
            {user_id !== parseInt(userId) && isFollowing &&
            <button onClick={makeFollow} className="user-profile-edit-btn-unfollow">Unfollow</button>
            }
            {user_id !== parseInt(userId) && !isFollowing &&
            <button onClick={makeFollow} className="user-profile-edit-btn">follow</button>
            }
          </div>
          <div className="user-profile-stats">
            <div>
              <strong>{user.followers?.length}</strong> posts
            </div>
            <div>
              <strong>{user.followers?.length}</strong> followers
            </div>
            <div>
              <strong>{following}</strong> following
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
            <div key={post.id} onDoubleClick={closePost} className="user-profile-post-card">
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
              {viewPost && <ViewPostModal post={post} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default User;
