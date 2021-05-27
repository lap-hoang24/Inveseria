import { GET_USERPORTFOLIO } from '../actions/actionTypes';
import axios from 'axios';


export const getUserPortfolio = (userId) => {
   return async (dispatch, getState) => {
      let totalBalance = 0;
      let portfolios = await axios.post('/stockApi/getUserPortfolio', userId);
      portfolios.data.forEach(port => {
         totalBalance += port.avgPrice * port.numOfShares;
      })
      portfolios.totalBalance = totalBalance;
      dispatch({ type: GET_USERPORTFOLIO, portfolios })
   }
}