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
import { viewSinglePost } from "../store/post";
import './SinglePost.css'


const SinglePost = () => {

  const dispatch = useDispatch();
  const { postId } = useParams();
  const [comment, setComment] = useState('');
  const [commentOptions, setCommentOptions] = useState(false);
  const userId = useSelector(state => state.session.user?.id);
  const userPostsObj = useSelector((state) => state.post);
  const usersPosts = useSelector(state => state.post)
  const postObj = useSelector((state) => state.post[postId]);

  if (postObj) console.log('INDIVIDUAL POST ', postObj?.user_id)
  const userPosts = useSelector(state => state.post.posts)
  const [viewPost, setViewPost] = useState(false)

  useEffect(() => {
    dispatch(populatePosts());
    dispatch(viewSinglePost(userId));
  }, [dispatch]);

  const closePost = () => {
    if (viewPost) setViewPost(false);
    else setViewPost(true);
  };

  //====================

  const makeCommentHandler = () => {

    if (comment) {

      let vals = {
        user_id: userId,
        post_id: postObj.id,
        comment
      }
      dispatch(makeComment(vals))
      dispatch(populatePosts())
      setComment('')
    }
  }

  const removeComment = id => {
    dispatch(deleteComment(id))
    dispatch(populatePosts())
  }

  const closeCommentOptions = () => {
    if (commentOptions) setCommentOptions(false)
    else setCommentOptions(true)
  }

  let viewCommentOptions = <CommentOptionModal post={postObj} />

  return (
    <>
      <div className='individual-post'>
        <img className='individual-post-image' src={postObj?.imageUrl} />
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

      {/* =============================================== */}

      {/* <div className="user-profile-post-container">

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

      </div> */}
    </>
  )

}

export default SinglePost;
