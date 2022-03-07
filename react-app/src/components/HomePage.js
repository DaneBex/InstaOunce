import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { populatePosts } from '../store/post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.post);
  const posts = Object.values(postsObj);


  useEffect(() => {
    dispatch(populatePosts());
  }, []);


  if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className='main-homepage'>
            {posts && posts?.map(post => (
                <div className='post-box'>
                    <div className='header-post'>
                        <div className='image-prof-details'>
                            <img className='prof-pic-post' src={post.user_prof_pic} />
                            <h2>{post.user_prof_username}</h2>
                        </div>
                        <FontAwesomeIcon className='three-dots' icon={faEllipsis} />
                    </div>
                    <img className='postbox-image' src={post.imageUrl} />
                    <div className='post-icons'>
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
                    <div className='likes'>
                        <p className='liked-by-names'>Liked by </p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default HomePage;
