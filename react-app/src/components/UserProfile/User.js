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
import ViewFollowModal from "../ViewFollowerModal";
import ViewFollowingModal from "../ViewFollowingModal";

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

  const [viewFollowers, setViewFollowers] = useState(false)
  const [viewFollowing, setViewFollowing] = useState(false)

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

  const closeViewFollowers = () => {
    if (viewFollowers) setViewFollowers(false)
    else setViewFollowers(true)
  }

  const closeViewFollowing = () => {
    if (viewFollowing) setViewFollowing(false)
    else setViewFollowing(true)
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

let viewFollowersmodal = <ViewFollowModal user={user} />
let viewFollowingmodal = <ViewFollowingModal user={user} />




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
              <NavLink to={`/users/${user_id}/edit`}>
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
              <strong>{user.posts?.length}</strong> posts
            </div>
            <div className="user-prof-followers-button" onClick={closeViewFollowers}>
              <strong >{user.followers?.length}</strong> followers
            </div>
            {viewFollowers && viewFollowersmodal}
            <div>
              <strong>{following}</strong> following
            </div>
            {viewFollowing && viewFollowingmodal}
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
              <NavLink to={`/posts/${post.id}`}>
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
              </NavLink>
              <img className="user-profile-post-img" src={post.imageUrl} />
              {/* {viewPost && <ViewPostModal user_post_id={userId} post={post} />} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default User;
