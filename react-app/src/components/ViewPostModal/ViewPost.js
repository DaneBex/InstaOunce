import React, { useState } from "react";
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

function ViewPost({ post }) {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user?.id)
    const [comment, setComment] = useState('')
    const [commentOptions, setCommentOptions] = useState(false)


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
                        <li >
                            <div className="individual-li">
                                <img className='prof-pic-post' src={comment.user_prof_pic} />
                                <p className='postbox-caption-username-individual'>{comment.user_username}</p>
                                <p>{comment.comment}</p>
                                {user_id === comment.user_id && <FontAwesomeIcon onClick={closeCommentOptions} className='delete-icon-dots' icon={faEllipsis} />}
                                {commentOptions && viewCommentOptions}
                            </div>
                        </li>
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
