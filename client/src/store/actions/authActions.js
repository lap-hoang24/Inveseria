import { LOGIN, SIGNUP } from './actionTypes';
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

