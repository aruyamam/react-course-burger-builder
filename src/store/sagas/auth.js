import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
   logout,
   logoutSucceed,
   authStart,
   authSuccess,
   authFail,
   checkAuthTimeout
} from '../actions';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export function* logoutSaga(action) {
   yield call([localStorage, 'removeItem'], 'token');
   yield call([localStorage, 'removeItem'], 'expirationDate');
   yield call([localStorage, 'removeItem'], 'userId');

   yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime * 1000);
   yield put(action.logout());
}

export function* authUserSaga(action) {
   yield put(authStart());

   const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
   };

   let signMode = action.isSignup ? 'signupNewUser' : 'verifyPassword';
   let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${signMode}?key=${FIREBASE_API_KEY}`;

   try {
      const response = yield axios.post(url, authData);

      const expirationDate = new Date(
         new Date().getTime() + response.data.expiresIn * 1000
      );

      yield localStorage.setItem('token', response.data.idToken);
      yield localStorage.setItem('expirationDate', expirationDate);
      yield localStorage.setItem('userId', response.data.localId);
      yield put(authSuccess(response.data.idToken, response.data.localId));
      yield put(checkAuthTimeout(response.data.expiresIn));
   }
   catch (error) {
      yield put(authFail(err.response.data.error));
   }
}

export function* authCheckStateSage(action) {
   const token = yield localStorage.getItem('token');
   if (!token) {
      yield put(logout());
   }
   else {
      const expirationDate = yield new Date(
         localStorage.getItem('expirationDate')
      );
      if (expirationDate <= new Date()) {
         yield put(logout());
      }
      else {
         const userId = yield localStorage.getItem('userId');
         yield put(authSuccess(token, userId));
         yield put(
            checkAuthTimeout(
               (expirationDate.getTime() - new Date().getTime()) / 1000
            )
         );
      }
   }
}
