import {user} from './user';
import {combineReducers} from 'redux';

const Reducers = combineReducers({
    userState : user
})

export default Reducers;

