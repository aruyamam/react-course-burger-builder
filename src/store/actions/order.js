import axios from '../../axios-orders';
import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => ({
   type: PURCHASE_BURGER_SUCCESS,
   orderId: id,
   orderData
});

export const purchaseBurgerFail = error => ({
   type: PURCHASE_BURGER_FAIL,
   error
});

export const purchaseBurgerStart = orderData => disptach => {
   axios
      .post('/orders.json', orderData)
      .then(response => {
         console.log(orderData);
         disptach(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(error => dispatch(purchaseBurgerFail(error)));
};
