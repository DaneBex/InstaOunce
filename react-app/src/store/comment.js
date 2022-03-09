import { csrfFetch } from "./csrf";


const ADD_COMMENT = 'comment/ADD_COMMENT'
const REMOVE_COMMENT = 'comment/REMOVE_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'
const LOAD_COMMENT = 'comment/LOAD_COMMENT'

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

const loadComment = (comments) => {
    return {
        type: LOAD_COMMENT,
        payload: comments
    }
}

const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export const populateComments = () => async (dispatch) => {
    const response = await fetch("/api/comments/");
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComment(comments))
    }
}

export const makeComment = (formInfo) => async dispatch => {
    const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formInfo)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data))
        return data;
    }
}


export const editComment = (id, formInfo) => async dispatch => {
    console.log(id)
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data))
    }
}

export const deleteComment = (id) => async dispatch => {
    console.log('Yes')
    console.log(id)
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeComment(id.id))
    }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENT:
            newState = {}
            action.payload.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
        case ADD_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case REMOVE_COMMENT:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default commentReducer
