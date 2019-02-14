import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export class BurgerBuilder extends Component {
   state = {
      ingredients: {
         // bacon: 1,
         // cheese: 2,
         // meat: 2,
         // salad: 1,
      },
   };

   render() {
      const { ingredients } = this.state;

      return (
         <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls />
         </Fragment>
      );
   }
}

export default BurgerBuilder;
