import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "../PostFormModal";
import { useState } from "react";
import { populatePosts } from "../../store/post";
import { deletePost } from "../../store/post";


const PostOption = ({ post }) => {
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.session.user?.id);

    const [viewPost, setViewPost] = useState(false)

    const closePost = () => {
        if (viewPost) setViewPost(false);
        else setViewPost(true);
    };

    const removePost = id => {
        console.log(id)
        dispatch(deletePost(id))
        dispatch(populatePosts())
    }

    let viewPostModal = <PostFormModal />

    return (
        <div className="all-buttons">
            <button className="viewpost-button">Follow</button>
            <NavLink to={`/posts/${post.id}`} className="viewpost-navlink">Go to post</NavLink>
            {user_id === post.user_id &&
            <div className="owner-post-options">
            <button onClick={closePost} className='update-post-user'>Edit</button>
            <button className="delete-post-button" onClick={() => removePost(post.id)}>Delete</button>
            </div>
            }
        </div>
    )
}

export default PostOption
