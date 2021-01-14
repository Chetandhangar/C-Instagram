import {USER_STATE_CHANGED, USER_POSTS_STATE_CHANGED, USER_FOLLOWING_STATE_CHANGED, CLEAR_DATA} from '../constants'

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
        case CLEAR_DATA:
         return{
            initialState
         }
        default:
            return state;
    }
 
}