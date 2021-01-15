import {USER_STATE_CHANGED, USER_POSTS_STATE_CHANGED, USER_FOLLOWING_STATE_CHANGED,} from '../constants'

const initialState ={
    currentUser : null,
    posts : [],
    following : []
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
        case USER_FOLLOWING_STATE_CHANGED:
            return{
                ...state,
                following : action.following
            }
        default:
            return state;
    }
 
}