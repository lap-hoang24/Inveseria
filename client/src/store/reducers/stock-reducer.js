import { GET_USERPORTFOLIO, GET_PORTFOINTRA } from '../actions/actionTypes';


const initState = {};


const stockReducer = (state = initState, action) => {
   switch (action.type) {
      case GET_USERPORTFOLIO:
         return {
            ...state,
            userPortfo: action.userPortfo.data.portfolios,
            portfoIntra: action.userPortfo.data.portfoIntra
         }
      case GET_PORTFOINTRA:
         return {
            ...state,
            portfoIntra: action.portfoIntra
         }  
      default:
         return state;
   }
}


export default stockReducer;
