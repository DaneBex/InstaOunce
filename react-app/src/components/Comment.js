import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { faEllipsis, faBan } from '@fortawesome/free-solid-svg-icons'
import CommentOptionModal from "./CommentOptionModal";
import { useSelector } from "react-redux";

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
                            <p className='postbox-caption-username'>{comment.user_username}</p>
                            <p>{comment.comment}</p>
                            {user_id === comment.user_id && <FontAwesomeIcon onClick={closeCommentOptions} className='delete-icon-dots' icon={faEllipsis} />}
                            {commentOptions && viewCommentOptions}
                        </div>
    )
}

export default Comment
