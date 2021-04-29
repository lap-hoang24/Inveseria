import { LOGIN, SIGNUP } from '../actions/actionTypes';

const initState = {
   user: {},
   message: {},
}

const userReducer = (state = initState, action) => {
   switch (action.type) {
      case LOGIN:
         return {
            ...state,
            user: action.user
         }

      case SIGNUP:
         return {
            ...state,
            message: action.message
         }
      default:
         return state
   }
}


export default userReducer;