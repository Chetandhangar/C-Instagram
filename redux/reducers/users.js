import {USERS_DATA_STATE_CHANGED, USERS_POSTS_STATE_CHANGED,CLEAR_DATA} from '../constants';

const initialState = {
    users : [],
    usersFollowingLoaded: 0
}

export const users = (state = initialState, action) =>{
    switch(action.type){
        case  USERS_DATA_STATE_CHANGED : 
        return{
            ...state,
            users: [...state.users, action.user]
        }
        case USERS_POSTS_STATE_CHANGED:
            return{
                ...state,
                usersFollowingLoaded: state.usersFollowingLoaded + 1,
                users : state.users.map(user => user.uid === action.uid ?
                    {...user, posts: action.posts} : user
                    )
            }
            case CLEAR_DATA : {
               return{
                   ...initialState
               }
            }
        default :
        return state;
    }
}