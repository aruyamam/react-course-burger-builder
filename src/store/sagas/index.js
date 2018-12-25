import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import {
   AUTH_INITIATE_LOGOUT,
   AUTH_CHECK_TIMEOUT,
   AUTH_USER,
   AUTH_CHECK_STATE,
   INIT_INGREDIENTS,
   PURCHASE_BURGER,
   FETCH_ORDERS
} from '../actions/actionTypes';
import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authUserSaga,
   authCheckStateSage
} from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { purchaseBurgerSage, fetchOrdersSage } from './order';

export function* watchAuth() {
   yield all([
      takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(AUTH_USER, authUserSaga),
      takeEvery(AUTH_CHECK_STATE, authCheckStateSage)
   ]);
}

export function* watchBurgerBuilder() {
   yield takeEvery(INIT_INGREDIENTS, initIngredientSaga);
}

export function* watchOrder() {
   yield takeLatest(PURCHASE_BURGER, purchaseBurgerSage);
   yield takeEvery(FETCH_ORDERS, fetchOrdersSage);
}
