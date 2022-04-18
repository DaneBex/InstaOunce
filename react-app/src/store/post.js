const ADD_POST = "post/ADD_POST";
const REMOVE_POST = "post/REMOVE_POST";
const UPDATE_POST = "post/UPDATE_POST";
const LOAD_POST = "post/LOAD_POST";
const USER_POSTS = "post/USER_POSTS";
const GET_POST = "post/GET_POST"
const LIST_POSTS = "post/LIST_POSTS"

const getUserPosts = (posts) => {
  return {
    type: USER_POSTS,
    posts,
  };
};

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

const getPost = (post) => {
  return {
    type: GET_POST,
    post
  };
};

const removePost = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

const getUserPostsSP = (posts) => {
  return {
    type: LIST_POSTS,
    posts
  }
}

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

export const userPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/users/${id}`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(getUserPosts(posts));
  }
};

export const viewSinglePost = (userId) => async (dispatch) => {
  const response = await fetch(`/api/posts/users/${userId}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(getUserPostsSP(posts));
  }
}

export const deletePost = (id) => async dispatch => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removePost(id))
  }
}

export const editPost = (id, formInfo) => async dispatch => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formInfo)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addPost(data))
  }
}

export const getSinglePost = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  });
  if(response.ok){
    const post = await response.json();
    dispatch(addPost(post))
  }
}

export const addRemoveLike = (userId, postId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${userId}/posts/${postId}`, {
    method: "POST"
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(addPost(post))
  }
}

const initialState = {};

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_POST:
      newState = {};
      action.payload.posts.forEach((post) => {
        newState[post.id] = post;
      });
      // console.log('this is the newState', newState);
      return newState;
    case ADD_POST:
      newState = { ...state, [action.post.id]: { ...action.post } };
      return newState;
    case USER_POSTS:
      newState = { ...action.posts };
      return newState;
    case LIST_POSTS:
      newState = { ...state }
      const list = []
      action.posts.posts.forEach(post => list.push(post))
      return newState["list"] = list;
    case REMOVE_POST:
      newState = { ...state }
      delete newState[action.id]
      return newState
    default:
      return state;
  }
};

export default postReducer;
