import axios from 'axios';
import {
   AUTH_START,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
   SET_AUTH_REDIRECT_PATH
} from './actionTypes';

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

export const logout = () => ({
   type: AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout());
      }, expirationTime * 1000);
   };
};

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
            dispatch(checkAuthTimeout(response.data.expiresIn));
         })
         .catch(err => {
            dispatch(authFail(err.response.data.error));
         });
   };
};

export const setAuthRedirectPath = path => ({
   type: SET_AUTH_REDIRECT_PATH,
   path
});
