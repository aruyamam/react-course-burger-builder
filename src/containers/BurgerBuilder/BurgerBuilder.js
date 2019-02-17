import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
      totalPrice: 0,
      purchasable: false,
      purchasing: false,
   };

   addIngredientHandler = (type) => {
      this.setState(
         prevState => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] + 1,
            },
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
         }),
         this.updatePurchaseState,
      );
   };

   removeIngredientHandler = (type) => {
      this.setState(
         prevState => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] - 1,
            },
            totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
         }),
         this.updatePurchaseState,
      );
   };

   purchasehandler = () => {
      this.setState({ purchasing: true });
   };

   updatePurchaseState() {
      const { ingredients } = this.state;
      const purchasable = Object.keys(ingredients).some(ing => ingredients[ing] !== 0);

      this.setState({ purchasable });
   }

   render() {
      const {
         ingredients, totalPrice, purchasable, purchasing,
      } = this.state;
      const disabledInfo = {
         ...ingredients,
      };

      for (const key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      return (
         <Fragment>
            <Modal show={purchasing}>
               <OrderSummary ingredients={ingredients} />
            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls
               disabled={disabledInfo}
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               ordered={this.purchasehandler}
               price={totalPrice}
               purchasable={purchasable}
            />
         </Fragment>
      );
   }
}

export default BurgerBuilder;
