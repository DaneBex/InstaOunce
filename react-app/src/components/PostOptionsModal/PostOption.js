import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "../PostFormModal";
import { useState } from "react";
import { populatePosts } from "../../store/post";
import { deletePost } from "../../store/post";
import EditPost from "../EditPostModal/EditPost";
import EditPostModal from "../EditPostModal";
import { followUser, populateUsers } from "../../store/user";


const PostOption = ({ post }) => {
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.session.user?.id);
    const usersObj = useSelector(state => state.user)
    const users = Object.values(usersObj)
    const user = users.find(user => post.user_id === user.id)
    let isFollowing = false

    const [viewPost, setViewPost] = useState(false)
    const [viewEditPost, setViewEditPost] = useState(false)

    useEffect(() => {
        dispatch(populateUsers())
    }, [])

    const closePost = () => {
        if (viewPost) setViewPost(false);
        else setViewPost(true);
    };

    const closeEdit = () => {
        if (viewEditPost) setViewEditPost(false)
        else setViewEditPost(true)
    }

    const removePost = id => {
        console.log(id)
        dispatch(deletePost(id))
        dispatch(populatePosts())
    }

    const makeFollow = () => {
        dispatch(followUser(user_id, post.user_id))
        dispatch(populateUsers())
        window.location.reload(false);
      }

    let viewPostModal = <PostFormModal />
    let editPost = <EditPostModal post={post} />

    console.log(users)

    if (user) {
        if (user.followers) {
            isFollowing = user.followers.find(user => user.id === user_id)
          }
    }


    return (
        <div className="all-buttons">

            <NavLink to={`/posts/${post.id}`} className="viewpost-navlink">Go to post</NavLink>
            {user_id === post.user_id &&
            <div className="owner-post-options">
            <button onClick={closeEdit} className='update-post-user'>Edit</button>
            {viewEditPost && editPost}
            <button className="delete-post-button" onClick={() => removePost(post.id)}>Delete</button>
            </div>
            }
        </div>
    )
}

export default PostOption
