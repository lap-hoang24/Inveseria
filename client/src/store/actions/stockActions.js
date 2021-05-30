import { GET_USERPORTFOLIO, GET_PORTFOINTRA } from '../actions/actionTypes';
import axios from 'axios';


export const getUserPortfolio = (userId) => {
   return async (dispatch, getState) => {
      let totalBalance = 0;
      let userPortfo = await axios.post('/stockApi/getUserPortfolio', userId);
      userPortfo.data.portfolios.forEach(port => {
         totalBalance += port.avgPrice * port.numOfShares;
      })
      userPortfo.data.portfolios.totalBalance = totalBalance;
      dispatch({ type: GET_USERPORTFOLIO, userPortfo })
   }
}


export const getPortfoIntra = (portfo) => {
   return async (dispatch, getState) => {
      let portfoIntra = await axios.post('/stockApi/getPortfoIntra', portfo);

      console.log(portfoIntra);
      dispatch({type: GET_PORTFOINTRA, portfoIntra});
   }
}


export const getUserPort = async (userId) => {
   let totalBalance = 0;
   let userPortfo = await axios.post('/stockApi/getUserPortfolio', userId);
      userPortfo.data.portfolios.forEach(port => {
         totalBalance += port.avgPrice * port.numOfShares;
      })
      userPortfo.data.portfolios.totalBalance = totalBalance;

      console.log(userPortfo);
}