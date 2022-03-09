
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { makeComment, populateComments } from '../store/comment'
import { populatePosts } from '../store/post'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { faEllipsis, faBan } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faFaceSmile} from '@fortawesome/free-regular-svg-icons'
import ViewPost from './ViewPostModal/ViewPost'
import ViewPostModal from './ViewPostModal'
import { deleteComment } from '../store/comment'
import PostOptionModal from './PostOptionsModal'
import CommentOptionModal from './CommentOptionModal'
import Comment from './Comment'

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user_id = useSelector((state) => state.session.user?.id);
  const postsObj = useSelector((state) => state.post);
  const posts = Object.values(postsObj);
  const commentsObj = useSelector((state) => state.comment);
  const comments = Object.values(commentsObj);


    const [viewPost, setViewPost] = useState(false)
    const [postOptions, setPostOptions] = useState(false)
    const [commentOptions, setCommentOptions] = useState(false)

    const removeComment = id => {
        dispatch(deleteComment(id))
        dispatch(populatePosts())
    }


    const makeCommentHandler = () => {

        if (comment) {

            let vals = {
                user_id,
                post_id: post.id,
                comment
            }
            dispatch(makeComment(vals))
            dispatch(populatePosts())
            setComment('')
        }
    }

    // useEffect(() => {
    //     dispatch(populateComments())
    //     dispatch(populatePosts())
    // }, [])

    const closePost = () => {
        if (viewPost) setViewPost(false)
        else setViewPost(true)
    }
  };


    const closePostOptions = () => {
        if (postOptions) setPostOptions(false)
        else setPostOptions(true)
    }

    const closeCommentOptions = () => {
        if (commentOptions) setCommentOptions(false)
        else setCommentOptions(true)
    }


    let viewPostNow = <ViewPostModal post={post} />
    let viewPostOptions = <PostOptionModal post={post} />
    let viewCommentOptions = <CommentOptionModal post={post} />

  const closePost = () => {
    if (viewPost) setViewPost(false);
    else setViewPost(true);
  };

  let viewPostNow;
  viewPostNow = <ViewPostModal post={post} />;


    return (
        <div className='post-box'>
            <div className='header-post'>
                <div className='image-prof-details'>
                    <img className='prof-pic-post' src={post.user_prof_pic} />
                    <h2>{post.user_prof_username}</h2>
                </div>
                <FontAwesomeIcon onClick={closePostOptions} className='three-dots' icon={faEllipsis} />
                {postOptions && viewPostOptions}
            </div>
            <img className='postbox-image' src={post.imageUrl} />
            <div className='post-icons'>
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
            <div className='likes'>
                <p className='liked-by-names'>{post.likes} likes</p>
            </div>
            <div className='postbox-caption-comments'>
                <div className='postbox-caption'>
                    <p className='postbox-caption-username'>{post.user_prof_username}</p>
                    <p>{post.caption}</p>
                </div>
                <div className='postbox-view-comments'>
                    <p onClick={closePost} className='view-comments-button'>View all {post.comments.length} comments</p>
                    {viewPost && viewPostNow}
                </div>
                <div className='postbox-comments'>
                    {post.comments && post.comments.slice(0, 2).map(newComment => (
                        <Comment post={post} comment={newComment} />
                    ))}
                </div>
            </div>
            <div className='add-comment-box'>
                <div className='smile-div'>
                    <FontAwesomeIcon className='smileface-icon' icon={faFaceSmile} />
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='enter-comment-box' placeholder='Add a comment...' />
                <button className='post-comment-button' onClick={makeCommentHandler}>Post</button>
            </div>
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
  );
};

export default Post;
