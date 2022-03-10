import React from "react";
import { editPost, populatePosts } from "../../store/post";
import "./EditPost.css"
import { useState } from "react";
import { useDispatch } from "react-redux";

const EditPost = ({ post }) => {
    const dispatch = useDispatch()
    const [caption, setCaption] = useState('')

    const editPostHandler = () => {
        if (caption) {
            dispatch(editPost(post.id, caption))
            dispatch(populatePosts())
        }
  }

    return (
        <div className="edit-caption">
        <p>Update Caption</p>
        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="enter-edit-text"></textarea>
        <button onClick={editPostHandler} className="post-comment-button">Post</button>
        </div>
    )
}

export default EditPost
