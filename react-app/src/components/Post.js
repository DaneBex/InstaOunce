import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeComment } from "../store/comment";
import { populatePosts } from "../store/post";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fatHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import ViewPostModal from "./ViewPostModal";
import PostOptionModal from "./PostOptionsModal";
import Comment from "./Comment";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user_id = useSelector((state) => state.session.user?.id);
  const postsObj = useSelector((state) => Object.values(state.post));
  const commentsObj = useSelector((state) => state.comment);
  const comments = Object.values(commentsObj);

  const [viewPost, setViewPost] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const makeCommentHandler = () => {
    if (comment) {
      let vals = {
        user_id,
        post_id: post.id,
        comment,
      };
      dispatch(makeComment(vals));
      dispatch(populatePosts());
      setComment("");
    }
  };

  const closePostOptions = () => {
    if (postOptions) setPostOptions(false);
    else setPostOptions(true);
  };

  let viewPostNow = <ViewPostModal post={post} />;
  let viewPostOptions = <PostOptionModal post={post} />;
  const closePost = () => {
    if (viewPost) setViewPost(false);
    else setViewPost(true);
  };

  const handleLike = async () => {
    const response = await fetch(`/api/likes/${user_id}/posts/${post.id}`, {
      method: "POST",
      body: { post, user_id },
    });
    const res = await response.json();
    dispatch(populatePosts());
  };

  return (
    <>
      <div className="post-box">
        <div className="header-post">
          <div className="image-prof-details">
            <NavLink to={`/users/${post.user_id}`}>
              <img className="prof-pic-post" src={post.user_prof_pic} alt={post.user_prof_username}/>
            </NavLink>
            <NavLink
              to={`/users/${post.user_id}`}
              className="prof-details-username"
            >
              {post.user_prof_username}
            </NavLink>
          </div>
          <FontAwesomeIcon
            onClick={closePostOptions}
            className="three-dots"
            icon={faEllipsis}
          />
          {postOptions && viewPostOptions}
        </div>
        <img className="postbox-image" src={post.imageUrl} alt={post.user_prof_username}/>
        <div className="post-icons">
          <div className="heart-div" onClick={handleLike}>
            <FontAwesomeIcon
              className={
                post?.likes_list?.find((like) => like.user_id === user_id)
                  ? "heart-icon red-icon"
                  : "heart-icon"
              }
              icon={
                post?.likes_list?.find((like) => like.user_id === user_id)
                  ? fatHeart
                  : faHeart
              }
            />
          </div>
          <div className="comment-div">
            <FontAwesomeIcon className="comment-icon" icon={faComment} onClick={closePost} />
          </div>
        </div>
        <div className="likes">
          <p className="liked-by-names">{post.likes} likes</p>
        </div>
        <div className="postbox-caption-comments">
          <div className="postbox-caption">
            <p className="postbox-caption-username">
              {post.user_prof_username}
            </p>
            <p>{post.caption}</p>
          </div>
          <div className="postbox-view-comments">
            <p onClick={closePost} className="view-comments-button">
              View all {post.comments?.length} comments
            </p>
            {viewPost && viewPostNow}
          </div>
          <div className="postbox-comments">
            {post.comments &&
              post.comments
                .slice(0, 2)
                .map((newComment, id) => (
                  <Comment key={id} post={post} comment={newComment} />
                ))}
          </div>
        </div>
        <div className="add-comment-box">
          <div className="smile-div">
            <FontAwesomeIcon className="smileface-icon" icon={faFaceSmile} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="enter-comment-box"
            placeholder="Add a comment..."
          />
          <button className="post-comment-button" onClick={makeCommentHandler}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
