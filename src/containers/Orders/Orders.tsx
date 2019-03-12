import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { IOrder } from '../BurgerBuilder/BurgerBuilderTypes';

interface IState {
   orders: [];
   loading: boolean;
}

class Orders extends Component<IState> {
   public readonly state = {
      orders: [],
      loading: true,
   };

   public componentDidMount() {
      axios
         .get('/orders.json')
         .then((res) => {
            const fetchedOrders = [];
            for (const key in res.data) {
               if (res.data.hasOwnProperty(key)) {
                  fetchedOrders.push({
                     ...res.data[key],
                     id: key,
                  });
               }
            }

            this.setState({ laoding: false, orders: fetchedOrders });
         })
         .catch((err) => {
            this.setState({ loading: false });
         });
   }

   public render() {
      const { orders } = this.state;

      return (
         <div>
            {orders.map((order: IOrder & { id: string }) => (
               <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            ))}
         </div>
      );
   }
}

export default withErrorHandler(Orders, axios);
