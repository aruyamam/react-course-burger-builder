import axios from '../../axios-orders';
import {
   PURCHASE_BURGER_START,
   PURCHASE_BURGER_SUCCESS,
   PURCHASE_BURGER_FAIL
} from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => ({
   type: PURCHASE_BURGER_SUCCESS,
   orderId: id,
   orderData
});

export const purchaseBurgerFail = error => ({
   type: PURCHASE_BURGER_FAIL,
   error
});

const purchaseBurgerStart = () => ({
   type: PURCHASE_BURGER_START
});

export const purchaseBurger = orderData => disptach => {
   disptach(purchaseBurgerStart());

   axios
      .post('/orders.json', orderData)
      .then(response => {
         console.log(orderData);
         disptach(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => dispatch(purchaseBurgerFail(error)));
};
