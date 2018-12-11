import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/action';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

class BurgerBuilder extends Component {
   state = {
      purchasable: false,
      loading: false,
      error: false
   };

   componentDidMount() {
      console.log(this.props);
      // axios.get('https://react-my-burger-96345.firebaseio.com/ingredients.json')
      //   .then(response => {
      //     console.log(response);
      //     this.setState({ ingredients: response.data });
      //   })
      //   .catch(error => {
      //     this.setState({ error: true });
      //   });
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
      this.setState({ purchasing: true });
   };

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   };

   purchaseContinueHandler = () => {
      // alert('You continue!');
      const queryParams = [];
      for (let i in this.state.ingredients) {
         queryParams.push(
            encodeURIComponent(i) +
               '=' +
               encodeURIComponent(this.state.ingredients[i])
         );
      }
      queryParams.push('price=' + this.state.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
         pathname: '/checkout',
         search: '?' + queryString
      });
   };

   render() {
      const {
         ings,
         onIngredientAdded,
         onIngredientRemoved,
         price
      } = this.props;

      const disabledInfo = { ...ings };

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;
      let burger = this.state.error ? (
         <p>Ingredients can't loaded!</p>
      ) : (
         <Spinner />
      );

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
      if (this.state.loading) {
         orderSummary = <Spinner />;
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
   ings: state.ingredients,
   price: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
   onIngredientAdded: ingredientName =>
      dispatch({
         type: ADD_INGREDIENT,
         ingredientName
      }),
   onIngredientRemoved: ingredientName =>
      dispatch({
         type: REMOVE_INGREDIENT,
         ingredientName
      })
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
