import axios from 'axios';
import {
   AUTH_START,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
   AUTH_INITIATE_LOGOUT,
   AUTH_CHECK_TIMEOUT,
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

export const logout = () => {
   // localStorage.removeItem('token');
   // localStorage.removeItem('expirationDate');
   // localStorage.removeItem('userId');

   return { type: AUTH_INITIATE_LOGOUT };
};

export const logoutSucceed = () => {
   return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
   return {
      type: AUTH_CHECK_TIMEOUT,
      expirationTime: expirationTime
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
            const expirationDate = new Date(
               new Date().getTime() + response.data.expiresIn * 1000
            );

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
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

export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
         dispatch(logout());
      }
      else {
         const expirationDate = new Date(
            localStorage.getItem('expirationDate')
         );
         if (expirationDate <= new Date()) {
            dispatch(logout());
         }
         else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(
               checkAuthTimeout(
                  (expirationDate.getTime() - new Date().getTime()) / 1000
               )
            );
         }
      }
   };
};
