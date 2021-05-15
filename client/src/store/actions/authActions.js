import { LOGIN, SIGNUP, GET_USERINFO } from './actionTypes';
import axios from 'axios';

export const login = (userCredentials) => {
   return (dispatch, getState) => {
      axios.post('/auth/login', userCredentials)
         .then(user => dispatch({ type: LOGIN, user }))
         .catch(err => console.error(err))
   }
}


export const signup = (userInfo) => {
   return (dispatch, getState) => {
      axios.post('/auth/signup', userInfo)
         .then(message => { dispatch({ type: SIGNUP, message }) })
         .catch(err => { console.error(err) })
   }
}

export const getUserInfo = (id) => {
   return (dispatch, getState) => {
      axios.post('/auth/info', id)
      .then(userInfo => dispatch({type: GET_USERINFO, userInfo}))
      .catch(err=> console.error(err))
   }
}