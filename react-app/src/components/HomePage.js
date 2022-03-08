import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { populatePosts } from '../store/post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import './HomePage.css'
import { populateLikes } from '../store/like';

const HomePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const postsObj = useSelector(state => state.post)
    const posts = Object.values(postsObj)
    const user_id = useSelector(state => state.session.user?.id)

    const [comment, setComment] = useState('')


    useEffect(() => {
        //  dispatch(populateLikes())
        dispatch(populatePosts())
    }, [dispatch])

    const makeComment = (post_id) => {
        //e.preventDefault()

        if (comment) {

            let vals = {
                user_id,
                post_id,
                comment
            }

            dispatch(makeComment(vals))
            setComment('')
        }
    }


  if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className='main-homepage'>
            {posts && posts?.map(post => (
                <div className='post-box'>
                    <div className='header-post'>
                        <div className='image-prof-details'>
                            <img className='prof-pic-post' src={post.user_prof_pic} />
                            <h2>{post.user_prof_username}</h2>
                        </div>
                        <FontAwesomeIcon className='three-dots' icon={faEllipsis} />
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
                            <p className='view-comments-button'>View all {post.comments.length} comments</p>
                        </div>
                        <div className='postbox-comments'>
                            {post.comments && post.comments.slice(0, 2).map(comment => (
                                <div className='postbox-caption'>
                                    <p className='postbox-caption-username'>{comment.user_username}</p>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='add-comment-box'>
                        <div className='smile-div'>
                            <FontAwesomeIcon className='smileface-icon' icon={faFaceSmile} />
                        </div>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='enter-comment-box' placeholder='Add a comment...' />
                        <button className='post-comment-button' onClick={() => makeComment(post.id)}>Post</button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default HomePage;
