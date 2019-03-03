import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
   state = {
      ingredients: {
         salad: 1,
         meat: 1,
         cheese: 1,
         bacon: 2,
      },
   };

   public render() {
      const { ingredients } = this.state;

      return (
         <div>
            <CheckoutSummary ingredients={ingredients} />
         </div>
      );
   }
}

export default Checkout;
