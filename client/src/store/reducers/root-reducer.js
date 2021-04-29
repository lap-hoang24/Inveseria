import {combineReducers} from 'redux';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
   userRed: userReducer,
})

export default rootReducer;

