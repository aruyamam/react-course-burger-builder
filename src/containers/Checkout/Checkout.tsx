import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { IIngredients } from '../BurgerBuilder/BurgerBuilderTypes';

class Checkout extends Component<RouteComponentProps> {
   public readonly state = {
      ingredients: {
         cheese: 1,
         bacon: 2,
         meat: 1,
         salad: 1,
      },
   };

   public componentDidMount() {
      const { location } = this.props;
      const query: URLSearchParams = new URLSearchParams(location.search);
      const ingredients: IIngredients = {
         cheese: 0,
         bacon: 0,
         meat: 0,
         salad: 0,
      };
      for (const param of query.entries()) {
         ingredients[param[0]] = +param[1];
      }

      this.setState({ ingredients });
   }

   public checkoutCancelHandler = () => {
      const { history } = this.props;
      history.goBack();
   };

   public checkoutContinueHandler = () => {
      const { history } = this.props;
      history.replace('/checkout/contact-data');
   };

   public render() {
      const { ingredients } = this.state;
      const { match } = this.props;

      return (
         <div>
            <CheckoutSummary
               checkoutCancelled={this.checkoutCancelHandler}
               checkoutContinued={this.checkoutContinueHandler}
               ingredients={ingredients}
            />
            <Route path={`${match.path}/contact-data`} component={ContactData} />
         </div>
      );
   }
}

export default Checkout;
