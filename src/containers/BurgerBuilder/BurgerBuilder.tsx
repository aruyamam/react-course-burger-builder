import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { IBBState, IDisabledInfo, IOrder } from './BurgerBuilderTypes';

enum IngredientPrices {
   salad = 0.5,
   cheese = 0.4,
   meat = 1.3,
   bacon = 0.7,
}

export declare type IngPricesType = keyof typeof IngredientPrices;

const disabledInfo: IDisabledInfo = {
   bacon: false,
   cheese: false,
   meat: false,
   salad: false,
};

class BurgerBuilder extends Component {
   public readonly state: Readonly<IBBState> = {
      ingredients: {
         bacon: 0,
         cheese: 0,
         meat: 0,
         salad: 0,
      },
      loading: false,
      purchasable: false,
      purchasing: false,
      totalPrice: 0,
   };

   public addIngredientHandler = (type: IngPricesType) => {
      this.setState(
         (prevState: IBBState) => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] + 1,
            },
            totalPrice: prevState.totalPrice + IngredientPrices[type],
         }),
         this.updatePurchaseState,
      );
   };

   public removeIngredientHandler = (type: IngPricesType) => {
      this.setState(
         (prevState: IBBState) => ({
            ingredients: {
               ...prevState.ingredients,
               [type]: prevState.ingredients[type] - 1,
            },
            totalPrice: prevState.totalPrice - IngredientPrices[type],
         }),
         this.updatePurchaseState,
      );
   };

   public purchaseHandler = () => {
      this.setState({ purchasing: true });
   };

   public purchaseContinueHandler = () => {
      this.setState({ loading: true });

      const { ingredients, totalPrice } = this.state;
      const order: IOrder = {
         ingredients,
         price: totalPrice,
         customer: {
            address: {
               country: 'Germany',
               street: 'Teststreet 1',
               zipCode: '41351',
            },
            email: 'test@test.com',
            name: 'Max Schwarzmuller',
         },
         deliverMethod: 'fastest',
      };

      axios.post<IOrder>('/orders.json', order)
         .then(response => this.setState({
            loading: false,
            purchasing: false,
         }))
         .catch((error) => {
            console.log(error);
            this.setState({
               loading: false,
               purchasing: false,
            });
         });
   };

   public purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   };

   public toggleModal = () => {
      this.setState((state: IBBState) => ({ purchasing: !state.purchasing }));
   };

   public render(): JSX.Element {
      const {
         loading, ingredients, totalPrice, purchasable, purchasing,
      } = this.state;

      for (const key in disabledInfo) {
         disabledInfo[key] = ingredients[key] <= 0;
      }

      let orderSummary: JSX.Element = (
         <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
         />
      );

      if (loading) {
         orderSummary = <Spinner/>;
      }

      return (
         <Fragment>
            <Modal toggleModal={this.toggleModal} show={purchasing}>
               {orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);
