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
         bacon: 0,
         cheese: 0,
         meat: 0,
         salad: 0,
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

   removeIngredientHandler = (type) => {
      const { ingredients, totalPrice } = this.state;

      const oldCount = ingredients[type];
      if (oldCount <= 0) {
         return;
      }

      const updatedCount = oldCount - 1;
      const updatedIngredients = {
         ...ingredients,
         [type]: updatedCount,
      };
      const priceDeduction = INGREDIENT_PRICES[type];
      const newPrice = totalPrice - priceDeduction;

      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredients,
      });
   };

   render() {
      const { ingredients } = this.state;
      const disabledInfo = {
         ...ingredients,
      };
      for (const key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      return (
         <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
               disabled={disabledInfo}
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
            />
         </Fragment>
      );
   }
}

export default BurgerBuilder;
