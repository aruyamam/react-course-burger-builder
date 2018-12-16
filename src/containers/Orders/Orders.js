import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
   componentDidMount() {
      const { onFetchOrders, token } = this.props;

      onFetchOrders(token);
   }

   render() {
      const { orders, loading } = this.props;
      let ordersElm = <Spinner />;

      if (!loading) {
         ordersElm = orders.map(order => (
            <Order
               key={order.id}
               ingredients={order.ingredients}
               price={order.price} // +order.price
            />
         ));
      }

      return <div>{ordersElm}</div>;
   }
}

const mapStateToProps = state => ({
   orders: state.order.orders,
   loading: state.order.loading,
   token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
   onFetchOrders: toekn => dispatch(fetchOrders(toekn))
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(Orders, axios));
