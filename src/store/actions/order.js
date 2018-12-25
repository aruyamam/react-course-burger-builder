import {
   PURCHASE_INIT,
   PURCHASE_BURGER_START,
   PURCHASE_BURGER_SUCCESS,
   PURCHASE_BURGER_FAIL,
   FETCH_ORDERS_START,
   FETCH_ORDERS_SUCCESS,
   FETCH_ORDERS_FAIL,
   PURCHASE_BURGER,
   FETCH_ORDERS
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

export const purchaseBurgerStart = () => ({
   type: PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => {
   return {
      type: PURCHASE_BURGER,
      orderData,
      token
   };
};

export const purchaseInit = () => ({
   type: PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
   type: FETCH_ORDERS_SUCCESS,
   orders
});

export const fetchOrdersFail = error => ({
   type: FETCH_ORDERS_FAIL,
   error
});

export const fetchOrderStart = () => ({
   type: FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => ({
   type: FETCH_ORDERS,
   token,
   userId
});
