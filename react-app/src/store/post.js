import { csrfFetch } from "./csrf";

const ADD_POST = "post/ADD_POST";
const REMOVE_POST = "post/REMOVE_POST";
const UPDATE_POST = "post/UPDATE_POST";
const LOAD_POST = "post/LOAD_POST";

const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

const loadPost = (posts) => {
  return {
    type: LOAD_POST,
    payload: posts,
  };
};

const removePost = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

export const populatePosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPost(posts));
  }
};

export const createPost = (payload) => async (dispatch) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(addPost(post));
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_POST:
      newState = {};
      action.payload.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case ADD_POST:
      newState = { ...state, [action.post.id]: { ...action.post } };
      return newState;
    default:
      return state;
  }
};

export default postReducer;
