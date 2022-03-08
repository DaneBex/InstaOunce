import { csrfFetch } from './csrf'

const ADD_LIKE = 'like/ADD_LIKE'
const REMOVE_LIKE = 'post/REMOVE_LIKE'
const UPDATE_LIKE = 'post/UPDATE_LIKE'
const LOAD_LIKE = 'post/LOAD_LIKE'

const addLike = (like) => {
    return {
        type: ADD_LIKE,
        payload: like
    }
}

const loadLike = (likes) => {
    return {
        type: LOAD_LIKE,
        payload: likes
    }
}

const removeLike = (id) => {
    return {
        type: REMOVE_LIKE,
        id
    }
}

// export const populateLikes = () => async (dispatch) => {
//     const response = await csrfFetch('/api/likes')
//     if (response.ok) {
//         const likes = await response.json()
//         dispatch(loadLike(likes))
//     }
// }

const initialState = {}

const likeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_LIKE:
            newState = {}
            action.payload.likes.forEach(like => {
                newState[like.id] = like
            })
            return newState
        default:
            return state;
    }
}

export default likeReducer
