import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
   addIngredient,
   removeIngredient,
   initIngredients,
   purchaseInit,
   setAuthRedirectPath
} from '../../store/actions';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

export class BurgerBuilder extends Component {
   state = {
      purchasable: false
   };

   componentDidMount() {
      this.props.onInitiIngredients();
   }

   updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);

      return sum > 0;
   }

   purchaseHandler = () => {
      const { onSetAuthRedirectPath, isAuthenticated, history } = this.props;

      if (isAuthenticated) {
         this.setState({ purchasing: true });
      }
      else {
         onSetAuthRedirectPath('/checkout');
         history.push('/auth');
      }
   };

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   };

   purchaseContinueHandler = () => {
      const { onInitPurchase, history } = this.props;

      onInitPurchase();
      history.push('/checkout');
   };

   render() {
      const {
         ings,
         onIngredientAdded,
         onIngredientRemoved,
         price,
         error,
         isAuthenticated
      } = this.props;

      const disabledInfo = { ...ings };

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;
      let burger = error ? <p>Ingredients can't loaded!</p> : <Spinner />;

      if (ings) {
         burger = (
            <Aux>
               <Burger ingredients={ings} />
               <BuildControls
                  ingredientAdded={onIngredientAdded}
                  ingredientRemoved={onIngredientRemoved}
                  disabled={disabledInfo}
                  purchasable={this.updatePurchaseState(ings)}
                  ordered={this.purchaseHandler}
                  isAuth={isAuthenticated}
                  price={price}
               />
            </Aux>
         );

         orderSummary = (
            <OrderSummary
               ingredients={ings}
               price={price}
               purchaseCancelled={this.purchaseCancelHandler}
               purchaseContinued={this.purchaseContinueHandler}
            />
         );
      }

      return (
         <Aux>
            <Modal
               show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}
            >
               {orderSummary}
            </Modal>
            {burger}
         </Aux>
      );
   }
}

const mapStateToProps = state => ({
   ings: state.burgerBuilder.ingredients,
   price: state.burgerBuilder.totalPrice,
   error: state.burgerBuilder.error,
   isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
   onIngredientAdded: ingName => dispatch(addIngredient(ingName)),
   onIngredientRemoved: ingName => dispatch(removeIngredient(ingName)),
   onInitiIngredients: () => dispatch(initIngredients()),
   onInitPurchase: () => dispatch(purchaseInit()),
   onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
