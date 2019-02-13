import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

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
            <div>Build Controls</div>
         </Fragment>
      );
   }
}

export default BurgerBuilder;
