import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const authStart = () => ({
   type: AUTH_START
});

const authSuccess = (idToken, userId) => ({
   type: AUTH_SUCCESS,
   idToken,
   userId
});

const authFail = error => ({
   type: AUTH_FAIL,
   error
});

export const auth = (email, password, isSignup) => {
   return dispatch => {
      dispatch(authStart());

      const authData = {
         email,
         password,
         returnSecureToken: true
      };

      let signMode = isSignup ? 'signupNewUser' : 'verifyPassword';
      let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${signMode}?key=${FIREBASE_API_KEY}`;

      axios
         .post(url, authData)
         .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
         })
         .catch(err => {
            console.log(err);
            dispatch(authFail(err));
         });
   };
};
