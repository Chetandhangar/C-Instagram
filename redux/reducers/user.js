import {USER_STATE_CHANGED, USER_POSTS_STATE_CHANGED} from '../constants'

const initialState ={
    currentUser : null,
    posts : []
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case USER_STATE_CHANGED:
            return {
                ...state,
                currentUser : action.currentUser
            }
        case USER_POSTS_STATE_CHANGED:
            return{
                ...state,
                posts:  action.posts
            }
        default:
            return state;
    }
 
}