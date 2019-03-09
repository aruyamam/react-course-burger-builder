import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { IIngredients } from '../BurgerBuilder/BurgerBuilderTypes';

interface IState {
   ingredients: IIngredients;
   totalPrice: number;
}

class Checkout extends Component<RouteComponentProps, IState> {
   public readonly state = {
      ingredients: {
         cheese: 0,
         bacon: 0,
         meat: 0,
         salad: 0,
      },
      totalPrice: 0,
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
      let price: number = 0;

      for (const param of query.entries()) {
         if (param[0] === 'price') {
            price = +param[1];
         }
         else {
            ingredients[param[0]] = +param[1];
         }
      }

      this.setState({
         ingredients,
         totalPrice: price,
      });
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
      const { ingredients, totalPrice } = this.state;
      const { match } = this.props;

      return (
         <div>
            <CheckoutSummary
               checkoutCancelled={this.checkoutCancelHandler}
               checkoutContinued={this.checkoutContinueHandler}
               ingredients={ingredients}
            />
            <Route
               path={`${match.path}/contact-data`}
               render={(props: RouteComponentProps) => (
                  <ContactData ingredients={ingredients} totalPrice={totalPrice} {...props} />
               )}
            />
         </div>
      );
   }
}

export default Checkout;
