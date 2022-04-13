import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { populatePosts } from "../store/post";
import Post from "./Post";
import "./HomePage.css";
import { populateComments } from "../store/comment";
import NavBar from "./NavBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.post);
  const postsList = Object.values(postsObj);
  const posts = postsList.reverse();
  const user_id = useSelector((state) => state.session.user?.id);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(populateComments());
    dispatch(populatePosts());
  }, [dispatch]);

  const makeComment = (post_id) => {
    //e.preventDefault()

    if (comment) {
      let vals = {
        user_id,
        post_id,
        comment,
      };
      dispatch(makeComment(vals));
      setComment("");
    }
  };

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <>
      <NavBar />
      <div className="main-homepage">
        {posts && posts?.map((post, id) => <Post key={id} post={post} />)}
      </div>
    </>
  );
};

export default HomePage;
