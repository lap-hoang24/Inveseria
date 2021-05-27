import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import stockReducer from './stock-reducer'

const rootReducer = combineReducers({
   userReducer: userReducer,
   stockReducer: stockReducer,
})

export default rootReducer;

