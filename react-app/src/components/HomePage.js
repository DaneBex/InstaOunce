import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { populatePosts } from '../store/post';
import Post from './Post'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import './HomePage.css'
import { populateLikes } from '../store/like';
import { populateComments } from '../store/comment';
import ViewPost from './ViewPostModal/ViewPost';
import NavBar from './NavBar';

const HomePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const postsObj = useSelector(state => state.post)
    const posts = Object.values(postsObj)
    const commentsObj = useSelector(state => state.comment)
    const comments = Object.values(commentsObj)
    const user_id = useSelector(state => state.session.user?.id)

    console.log(posts)
    console.log('comments:', comments)

    const [comment, setComment] = useState('')
    const [viewPost, setViewPost] = useState(false)

    useEffect(() => {
        dispatch(populateComments())
        dispatch(populatePosts())
    }, [dispatch])

    const makeComment = (post_id) => {
        //e.preventDefault()

        if (comment) {

            let vals = {
                user_id,
                post_id,
                comment
            }
            dispatch(makeComment(vals))
            setComment('')
        }
    }

    const openPost = () => {
        setViewPost(true)
    }



    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <>
        <div className='main-homepage'>

            {posts && posts?.map(post => (
                <Post post={post} />
            ))}

        </div>
        </>
    )
}

export default HomePage;
