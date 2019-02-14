import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
};

class BurgerBuilder extends Component {
   state = {
      ingredients: {
         bacon: 1,
         cheese: 2,
         meat: 2,
         salad: 1,
      },
      totalPrice: 4,
   };

   addIngredientHandler = (type) => {
      const { ingredients, totalPrice } = this.state;
      const oldCount = ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...ingredients,
         [type]: updatedCount,
      };
      const priceAddition = INGREDIENT_PRICES[type];
      const newPrice = totalPrice + priceAddition;

      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredients,
      });
   };

   removeIngredientHandler = (type) => {};

   render() {
      const { ingredients } = this.state;

      return (
         <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler} />
         </Fragment>
      );
   }
}

export default BurgerBuilder;
