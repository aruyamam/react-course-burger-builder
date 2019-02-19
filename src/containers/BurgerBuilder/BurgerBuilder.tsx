import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { BBState, DisabledInfo } from './BurgerBuilderTypes';

enum IngredientPrices {
   salad = 0.5,
   cheese = 0.4,
   meat = 1.3,
   bacon = 0.7,
}

declare type IngPricesType = keyof typeof IngredientPrices;

const disabledInfo: DisabledInfo = {
   bacon: false,
   cheese: false,
   meat: false,
   salad: false,
};

class BurgerBuilder extends Component {
   state: BBState = {
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

   addIngredientHandler = (type: IngPricesType) => {
      this.setState(
         (prevState: BBState) => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] + 1,
            },
            totalPrice: prevState.totalPrice + IngredientPrices[type],
         }),
         this.updatePurchaseState,
      );
   };

   removeIngredientHandler = (type: IngPricesType) => {
      this.setState(
         (prevState: BBState) => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] - 1,
            },
            totalPrice: prevState.totalPrice - IngredientPrices[type],
         }),
         this.updatePurchaseState,
      );
   };

   purchaseHandler = () => {
      this.setState({ purchasing: true });
   };

   purchaseContinueHandler = () => {
      alert('You continue!');
   };

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   };

   toggleModal = () => {
      this.setState((state: BBState) => ({ purchasing: !state.purchasing }));
   };

   public render() {
      const {
         ingredients, totalPrice, purchasable, purchasing,
      } = this.state;

      for (const key in disabledInfo) {
         disabledInfo[key] = ingredients[key] <= 0;
      }

      return (
         <Fragment>
            <Modal toggleModal={this.toggleModal} show={purchasing}>
               <OrderSummary
                  ingredients={ingredients}
                  price={totalPrice}
                  purchaseCancelled={this.purchaseCancelHandler}
                  purchaseContinued={this.purchaseContinueHandler}
               />
            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls
               disabled={disabledInfo}
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               ordered={this.purchaseHandler}
               price={totalPrice}
               purchasable={purchasable}
            />
         </Fragment>
      );
   }

   private updatePurchaseState() {
      const { ingredients } = this.state;
      const purchasable = Object.keys(ingredients).some(ing => ingredients[ing] !== 0);

      this.setState({ purchasable });
   }
}

export default BurgerBuilder;