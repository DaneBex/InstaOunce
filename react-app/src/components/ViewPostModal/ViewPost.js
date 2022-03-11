import React, { useEffect, useState } from "react";
import * as postActions from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { makeComment } from "../../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { Modal } from "../../context/Modal";
import { deleteComment } from "../../store/comment";
import { populatePosts } from '../../store/post'
import CommentOptionModal from "../CommentOptionModal";
import LargeCommentOption from "../Comment-Large";

function ViewPost({ user_post_id, post }) {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user?.id)
    const [comment, setComment] = useState('')
    const [commentOptions, setCommentOptions] = useState(false)

    useEffect(() => {
        populatePosts()
    }, [])


    const makeCommentHandler = () => {

        if (comment) {

            let vals = {
                user_id,
                post_id: post.id,
                comment
            }
            dispatch(makeComment(vals))
            
            if(user_post_id){
                dispatch(postActions.userPosts(user_post_id))
            }else{
                dispatch(populatePosts())
                
            }
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

    let viewCommentOptions = <CommentOptionModal post={post} />

    return (
        <div className='individual-post'>
            <img className='individual-post-image' src={post.imageUrl} />
            <div className='post-description-individual'>
                <div className='header-post-individual'>
                    <div className='image-prof-details-individual'>
                        <img className='prof-pic-post' src={post.user_prof_pic} />
                        <h2>{post.user_prof_username}</h2>
                    </div>
                    <FontAwesomeIcon className='three-dots' icon={faEllipsis} />
                </div>
                <ul className="comment-list">
                    <li >
                        <div className="individual-li">
                            <img className='prof-pic-post' src={post.user_prof_pic} />
                            <p className='postbox-caption-username-individual'>{post.user_prof_username}</p>
                            <p>{post.caption}</p>
                        </div>
                    </li>
                    {post.comments && post.comments.map(comment => (
                        <LargeCommentOption post={post} comment={comment} />
                    ))}
                </ul>
                <div className='post-icons-individual'>
                    <div className='heart-div'>
                        <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                    </div>
                    <div className='comment-div'>
                        <FontAwesomeIcon className='comment-icon' icon={faComment} />
                    </div>
                </div>
                <div className='likes-individual'>
                    <p className='liked-by-names'>{post.likes} likes</p>
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
    )
}

export default ViewPost
