import { GET_USERPORTFOLIO } from '../actions/actionTypes';


const initState = {};


const stockReducer = (state = initState, action) => {
   switch (action.type) {
      case GET_USERPORTFOLIO:
         return {
            ...state,
            portfolios: action.portfolios
         }
      default:
         return state;
   }
}


export default stockReducer;
