import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../axios-orders';
import { AxiosResponse } from 'axios'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { IBBState, IDisabledInfo, IIngredients, IOrder } from './BurgerBuilderTypes';

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

class BurgerBuilder extends Component<RouteComponentProps, IBBState> {
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
      isError: false,
   };

   public componentDidMount() {
      this.setState({ loading: true })
      axios.get<IIngredients>('/ingredients.json').then((response: AxiosResponse) => {
         this.setState({
            ingredients: response.data,
            loading: false,
         });
      })
      .catch(err => this.setState({ isError: true, loading: false }));
   }

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
      const { ingredients, totalPrice } = this.state;
      const queryParams: string[] = [];
      for (const i in ingredients) {
         if (ingredients.hasOwnProperty(i)) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i].toString())}`)
         }
      }
      
      queryParams.push(`price=${totalPrice}`);
      const queryString: string = queryParams.join('&');
      this.props.history.push({
         pathname: '/checkout',
         search: `?${queryString}`
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
         loading, ingredients, isError, totalPrice, purchasable, purchasing,
      } = this.state;

      for (const key in disabledInfo) {
         if (disabledInfo.hasOwnProperty(key)) {
            disabledInfo[key] = ingredients[key] <= 0;
         }
      }

      if (loading) {
         return <Spinner/>;
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
            {isError ? (
               <p>Ingredients can't be loaded</p>
            ) : (
               <Fragment>
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
            )}
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
