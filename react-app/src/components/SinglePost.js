import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { makeComment } from "../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faClipboard, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import LargeCommentOption from "./Comment-Large";
import './SinglePost.css'


const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [comment, setComment] = useState('');
  const userId = useSelector(state => state.session.user?.id);
  const postObj = useSelector((state) => state.post[postId]);
  const userPostsObj = useSelector((state) => state.post);
  const allPosts = Object.values(userPostsObj)
  const userPosts = allPosts.filter(post => post.user_id === postObj?.user_id)

  const makeCommentHandler = () => {

    if (comment) {

      let vals = {
        user_id: userId,
        post_id: postObj.id,
        comment
      }
      dispatch(makeComment(vals))
      setComment('')
    }
  }

  return (
    <>
      <div className='individual-post-sp'>
        <img className='individual-post-image-sp' src={postObj?.imageUrl} />
        <div className='post-description-individual'>
          <div className='header-post-individual'>
            <div className='image-prof-details-individual'>
              <img className='prof-pic-post' src={postObj?.user_prof_pic} />
              <h2>{postObj?.user_prof_username}</h2>
            </div>
            {/* <FontAwesomeIcon className='three-dots' icon={faEllipsis} /> */}
          </div>
          <ul className="comment-list">
            <li >
              <div className="individual-li">
                <img className='prof-pic-post' src={postObj?.user_prof_pic} />
                <p className='postbox-caption-username-individual'>{postObj?.user_prof_username}</p>
                <p>{postObj?.caption}</p>
              </div>
            </li>
            {postObj?.comments && postObj?.comments.map((comment, i) => (
              <LargeCommentOption post={postObj} comment={comment} key={i} />
            ))}
          </ul>
          <div className='post-icons-individual'>
            <div className='heart-div'>
              <FontAwesomeIcon className='heart-icon' icon={faHeart} />
            </div>
            <div className='comment-div'>
              <FontAwesomeIcon className='comment-icon' icon={faComment} />
            </div>
            <div className='send-div'>
              <FontAwesomeIcon className='send-icon' icon={faPaperPlane} />
            </div>
          </div>
          <div className='likes-individual'>
            <p className='liked-by-names'>{postObj?.likes} likes</p>
          </div>
          <div className='add-comment-box-individual'>
            <div className='smile-div'>
              <FontAwesomeIcon className='smileface-icon' icon={faFaceSmile} />
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='enter-comment-box-individual' placeholder='Add a comment...' />
            <button className='post-comment-button' onClick={makeCommentHandler}>Post</button>
          </div>
        </div>
      </div>

      <div className="user-profile-post-container">
        <p id="user-profile-post-header">
          <FontAwesomeIcon id="user-profile-post-icon" icon={faClipboard} />{" "}
          Posts
        </p>
        <div className="separator"></div>
        <div className="more-posts">More posts from <a className="mp-username" href={`/users/${postObj?.user_id}`}>{postObj?.user_prof_username}</a></div>
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
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SinglePost;
