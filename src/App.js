import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';

const asyncCheckout = asyncComponent(() => {
   return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
   return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
   return import('./containers/Auth/Auth');
});

class App extends Component {
   componentDidMount() {
      this.props.onTryAutoSingup();
   }

   render() {
      const { isAuthenticated } = this.props;

      let routes = (
         <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
         </Switch>
      );

      if (isAuthenticated) {
         routes = (
            <Switch>
               <Route path="/checkout" component={asyncCheckout} />
               <Route path="/orders" component={asyncOrders} />
               <Route path="/logout" component={Logout} />
               <Route path="/auth" component={asyncAuth} />
               <Route path="/" exact component={BurgerBuilder} />
               <Redirect to="/" />
            </Switch>
         );
      }

      return (
         <div>
            <Layout>{routes}</Layout>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
   onTryAutoSingup: () => dispatch(authCheckState())
});

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(App)
);
