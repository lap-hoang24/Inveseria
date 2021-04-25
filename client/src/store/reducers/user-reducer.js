import { LOGIN, SIGNUP } from '../actions/actionTypes';

const initState = {
   user: {}
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
            user: action.user
         }
      default:
         return state
   }
}


export default userReducer;