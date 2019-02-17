import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ ingredients }) => {
   const ingredientSummary = Object.keys(ingredients).map(igKey => (
      <li key={igKey}>
         <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
         {`: ${ingredients[igKey]}`}
      </li>
   ));

   return (
      <Fragment>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>{ingredientSummary}</ul>
         <p>Continue to Checkout?</p>
      </Fragment>
   );
};

OrderSummary.propTypes = {
   ingredients: PropTypes.shape({
      bacon: PropTypes.number.isRequired,
      cheese: PropTypes.number.isRequired,
      meat: PropTypes.number.isRequired,
      salad: PropTypes.number.isRequired,
   }).isRequired,
};

export default OrderSummary;
