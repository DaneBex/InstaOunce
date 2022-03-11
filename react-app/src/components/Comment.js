import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { faEllipsis, faBan } from '@fortawesome/free-solid-svg-icons'
import CommentOptionModal from "./CommentOptionModal";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Comment = ({ post, comment }) => {
    const user_id = useSelector(state => state.session.user?.id)


    const [commentOptions, setCommentOptions] = useState(false)

    const closeCommentOptions = () => {
        if (commentOptions) setCommentOptions(false)
        else setCommentOptions(true)
    }


    let viewCommentOptions = <CommentOptionModal post={post} comment={comment} />

    return (
        <div className='postbox-caption'>
                            <NavLink to={`/users/${comment.user_id}`} className='postbox-caption-username'>{comment.user_username}</NavLink>
                            <p>{comment.comment}</p>
                            {user_id === comment.user_id && <FontAwesomeIcon onClick={closeCommentOptions} className='delete-icon-dots' icon={faEllipsis} />}
                            {commentOptions && viewCommentOptions}
                        </div>
    )
}

export default Comment
