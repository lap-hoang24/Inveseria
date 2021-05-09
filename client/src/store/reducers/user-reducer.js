import { LOGIN, SIGNUP, GET_USERINFO } from '../actions/actionTypes';

const initState = {
   user: {},
   message: {}
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
      case GET_USERINFO:
         return {
            ...state,
            user: action.userInfo
         }
      default:
         return state
   }
}


export default userReducer;