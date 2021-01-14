import {USERS_DATA_STATE_CHANGED, USERS_POSTS_STATE_CHANGED,} from '../constants';

const initialState = {
    users : [],
    usersLoaded : 0
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
                usersLoaded : state.usersLoaded + 1,
                users : state.users.map(user => user.uid === action.uid ?
                    {...user, posts: action.posts} : user
                    )
            }
        default :
        return state;
    }
}