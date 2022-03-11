import { csrfFetch } from "./csrf"


const LOAD_USER = 'user/LOAD_USER'


const loadUser = users => {
    return {
        type: LOAD_USER,
        payload: users
    }
}

export const populateUsers = () => async dispatch => {
    console.log('happening')
    const response = await csrfFetch('/api/users/')

    if (response.ok) {
        const users = await response.json()
        dispatch(loadUser(users))
    }
}

export const followUser = (self, user) => async dispatch => {
    console.log('happening')
    const response = await fetch(`/api/users/${self}/${user}`)

    if (response.ok) {
        console.log(response)
    }
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER:
            newState = {}
            action.payload.users.forEach(user => {
                newState[user.id] = user;
            })
            console.log(newState)
            return newState
        default:
            return state;
    }
}

export default userReducer
