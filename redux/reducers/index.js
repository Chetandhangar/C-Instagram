import {user} from './user';
import {combineReducers} from 'redux';
import { users } from './users';

const Reducers = combineReducers({
    userState : user,
    usersState: users
})

export default Reducers;

