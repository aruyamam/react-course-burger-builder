import {
   AUTH_CHECK_STATE,
   AUTH_USER,
   AUTH_START,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
   AUTH_INITIATE_LOGOUT,
   AUTH_CHECK_TIMEOUT,
   SET_AUTH_REDIRECT_PATH
} from './actionTypes';

export const authStart = () => ({
   type: AUTH_START
});

export const authSuccess = (idToken, userId) => ({
   type: AUTH_SUCCESS,
   idToken,
   userId
});

export const authFail = error => ({
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
   return {
      type: AUTH_USER,
      email,
      password,
      isSignup
   };
};

export const setAuthRedirectPath = path => ({
   type: SET_AUTH_REDIRECT_PATH,
   path
});

export const authCheckState = () => {
   return {
      type: AUTH_CHECK_STATE
   };
};
