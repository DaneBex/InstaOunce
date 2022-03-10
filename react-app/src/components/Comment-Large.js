import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, populateComments } from "../store/comment";
import { populatePosts } from "../store/post";
import { deleteComment } from "../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import CommentOptionModal from "./CommentOptionModal";

const LargeCommentOption = ({ post, comment }) => {
    const dispatch = useDispatch()
    const [textComment, setComment] = useState('')
    const user_id = useSelector(state => state.session.user?.id)

    const [commentOptions, setCommentOptions] = useState(false)

    const makeCommentHandler = () => {

        if (textComment) {

            dispatch(editComment(comment.id, textComment))
            dispatch(populatePosts())
            setComment('')
        }
    }

    const closeCommentOptions = () => {
        if (commentOptions) setCommentOptions(false)
        else setCommentOptions(true)
    }


    const removeComment = id => {
        dispatch(deleteComment(id))
        dispatch(populatePosts())
    }

    let viewCommentOptions = <CommentOptionModal post={post} comment={comment} />

    return (
        <li >
        <div className="individual-li">
            <img className='prof-pic-post' src={comment.user_prof_pic} />
            <p className='postbox-caption-username-individual'>{comment.user_username}</p>
            <p>{comment.comment}</p>
            {user_id === comment.user_id && <FontAwesomeIcon onClick={closeCommentOptions} className='delete-icon-dots' icon={faEllipsis} />}
            {commentOptions && viewCommentOptions}
        </div>
    </li>
    )
}

export default LargeCommentOption
