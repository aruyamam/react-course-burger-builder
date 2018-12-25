import { takeEvery } from 'redux-saga/effects';

import {
   AUTH_INITIATE_LOGOUT,
   AUTH_CHECK_TIMEOUT,
   AUTH_USER,
   AUTH_CHECK_STATE,
   INIT_INGREDIENTS
} from '../actions/actionTypes';

import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authUserSaga,
   authCheckStateSage
} from './auth';

import { initIngredientSaga } from './burgerBuilder';

export function* watchAuth() {
   yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
   yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
   yield takeEvery(AUTH_USER, authUserSaga);
   yield takeEvery(AUTH_CHECK_STATE, authCheckStateSage);
}

export function* watchBurgerBuilder() {
   yield takeEvery(INIT_INGREDIENTS, initIngredientSaga);
}
