import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import {
   purchaseBurgerStart,
   purchaseBurgerSuccess,
   purchaseBurgerFail,
   fetchOrderStart,
   fetchOrdersSuccess,
   fetchOrdersFail
} from '../actions';

export function* purchaseBurgerSage(action) {
   yield put(purchaseBurgerStart());
   try {
      const response = yield axios.post(
         `/orders.json?auth=${action.token}`,
         action.orderData
      );
      yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
   }
   catch (error) {
      yield put(purchaseBurgerFail(error));
   }
}

export function* fetchOrdersSage(action) {
   yield put(fetchOrderStart());
   const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${
      action.userId
   }"`;

   try {
      const response = yield axios.get(`/orders.json${queryParams}`);
      const fetchedOrders = [];
      for (let key in response.data) {
         fetchedOrders.push({
            ...response.data[key],
            id: key
         });
      }

      yield put(fetchOrdersSuccess(fetchedOrders));
   }
   catch (error) {
      yield put(fetchOrdersFail(err));
   }
}
