import React from "react";
import { NavLink } from "react-router-dom";


const PostOption = ({ post }) => {


    return (
        <div className="all-buttons">
            <button className="viewpost-button">Follow</button>
            <NavLink to={`/posts/${post.id}`} className="viewpost-navlink">Go to post</NavLink>
        </div>
    )
}

export default PostOption
