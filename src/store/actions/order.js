import axios from '../../axios-orders';
import {
   PURCHASE_INIT,
   PURCHASE_BURGER_START,
   PURCHASE_BURGER_SUCCESS,
   PURCHASE_BURGER_FAIL,
   FETCH_ORDERS_START,
   FETCH_ORDERS_SUCCESS,
   FETCH_ORDERS_FAIL
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

export const purchaseBurger = (orderData, token) => disptach => {
   disptach(purchaseBurgerStart());

   axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
         console.log(orderData);
         disptach(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({
   type: PURCHASE_INIT
});

const fetchOrdersSuccess = orders => ({
   type: FETCH_ORDERS_SUCCESS,
   orders
});

const fetchOrdersFail = error => ({
   type: FETCH_ORDERS_FAIL,
   error
});

const fetchOrderStart = () => ({
   type: FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
   dispatch(fetchOrderStart());
   const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
   axios
      .get(`/orders.json${queryParams}`)
      .then(res => {
         const fetchedOrders = [];
         for (let key in res.data) {
            fetchedOrders.push({
               ...res.data[key],
               id: key
            });
         }

         dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => dispatch(fetchOrdersFail(err)));
};
