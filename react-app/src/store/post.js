import { csrfFetch } from './csrf'

const ADD_POST = 'post/ADD_POST'
const REMOVE_POST = 'post/REMOVE_POST'
const UPDATE_POST = 'post/UPDATE_POST'
const LOAD_POST = 'post/LOAD_POST'

const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    }
}

const loadPost = (posts) => {
    return {
        type: LOAD_POST,
        payload: posts
    }
}

const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

export const populatePosts = () => async (dispatch) => {
    const response = await csrfFetch('/api/posts')
    if (response.ok) {
        const posts = await response.json()
        console.log(posts)
        dispatch(loadPost(posts))
    }
}

const initialState = {};

const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POST:
            newState = {}
            action.payload.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        default:
            return state;
    }
}

export default postReducer
