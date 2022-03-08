import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { makeComment, populateComments } from '../store/comment'
import { populatePosts } from '../store/post'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import ViewPost from './ViewPostModal/ViewPost'
import ViewPostModal from './ViewPostModal'

const Post = ({ post }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const user_id = useSelector(state => state.session.user?.id)
    const postsObj = useSelector(state => state.post)
    const posts = Object.values(postsObj)
    const commentsObj = useSelector(state => state.comment)
    const comments = Object.values(commentsObj)

    const [viewPost, setViewPost] = useState(false)




    const makeCommentHandler = () => {

        if (comment) {

            let vals = {
                user_id,
                post_id: post.id,
                comment
            }
            dispatch(makeComment(vals))
            setComment('')
        }
    }

    useEffect(() => {
        dispatch(populateComments())
        dispatch(populatePosts())
    }, [])

    const closePost = () => {
        if (viewPost) setViewPost(false)
        else setViewPost(true)
    }

    let viewPostNow
    viewPostNow = <ViewPostModal post={post} />



    return (
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
                    <p onClick={closePost} className='view-comments-button'>View all {post.comments.length} comments</p>
                    {viewPost && viewPostNow}
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
                <button className='post-comment-button' onClick={makeCommentHandler}>Post</button>
            </div>
        </div>
    )
}

export default Post