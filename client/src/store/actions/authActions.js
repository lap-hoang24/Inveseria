import { LOGIN, SIGNUP, GET_USERINFO } from './actionTypes';
import axios from 'axios';

export const login = (userCredentials) => {
   return (dispatch, getState) => {
      axios.post('/user/login', userCredentials)
         .then(user => dispatch({ type: LOGIN, user }))
         .catch(err => console.error(err))
   }
}


export const signup = (userInfo) => {
   return (dispatch, getState) => {
      axios.post('/user/signup', userInfo)
         .then(message => { dispatch({ type: SIGNUP, message }) })
         .catch(err => { console.error(err) })
   }
}

export const getUserInfo = (email) => {
   return (dispatch, getState) => {
      axios.post('/user/info', email)
      .then(userInfo => dispatch({type: GET_USERINFO, userInfo}))
      .catch(err=> console.error(err))
   }
}