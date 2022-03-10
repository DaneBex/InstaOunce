import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, populateComments } from "../../store/comment";
import { populatePosts } from "../../store/post";
import { makeComment, deleteComment } from "../../store/comment";

const CommentOption = ({ post, comment }) => {
    const dispatch = useDispatch()
    const [textComment, setComment] = useState('')
    const user_id = useSelector(state => state.session.user?.id)

    const makeCommentHandler = () => {

        if (textComment) {

            dispatch(editComment(comment.id, textComment))
            dispatch(populatePosts())
            setComment('')
        }
    }


    const removeComment = id => {
        dispatch(deleteComment(id))
        dispatch(populatePosts())
    }

    return (
        <div className="comment-option-buttons">
            <div className="update-comment-text">
            <textarea className='update-comment-textarea' value={textComment} onChange={(e) => setComment(e.target.value)} className='enter-comment-box-individual' placeholder='Update comment...' />
                <button className='post-comment-button' onClick={makeCommentHandler}>Post</button>
            </div>
            <button className="delete-comment-button" onClick={() => removeComment(comment.id)}>Delete</button>
        </div>
    )
}

export default CommentOption
