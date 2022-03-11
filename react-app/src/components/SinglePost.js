import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as postActions from "../store/post"
import { makeComment } from "../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faClipboard, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { deleteComment } from "../store/comment";
import { populatePosts } from "../store/post";
import CommentOptionModal from "./CommentOptionModal";
import LargeCommentOption from "./Comment-Large";
import ViewPostModal from "./ViewPostModal";


const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const userId = useSelector(state => state.session.user?.id);
  const userPostsObj = useSelector((state) => state.post);
  const posts = Object.values(userPostsObj)
  console.log(posts)
  const postObj = useSelector((state) => state.post[postId]);

  const userPosts = posts.filter(post => postObj.user_id === postId)

  // console.log('SINGLE POST:', postObj)
  const [comment, setComment] = useState('')
  const [commentOptions, setCommentOptions] = useState(false)
  const [viewPost, setViewPost] = useState(false)

  useEffect(() => {
    dispatch(postActions.populatePosts());
    dispatch(postActions.userPosts(userId));
  }, [dispatch]);

  const closePost = () => {
    if (viewPost) setViewPost(false);
    else setViewPost(true);
  };

  return (
    <>
      <div className="user-profile-post-container">
        <p id="user-profile-post-header">
          <FontAwesomeIcon id="user-profile-post-icon" icon={faClipboard} />{" "}
          Posts
        </p>
        <div className="user-profile-posts-container">
          {userPosts?.map((post) => (
            <div key={post.id} onClick={closePost} className="user-profile-post-card">
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
    </>
  )
}

export default SinglePost;
