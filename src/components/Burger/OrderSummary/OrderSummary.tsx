import React, { Fragment } from 'react';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilderTypes';
import Button from '../../UI/Button/Button';

interface IProps {
   ingredients: Ingredients;
   price: number;
   purchaseCancelled: () => void;
   purchaseContinued: () => void;
}

const orderSummary: React.FC<IProps> = ({
   ingredients,
   price,
   purchaseCancelled,
   purchaseContinued,
}) => {
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
         <p>
            <strong>{`Total Price: ${price.toFixed(2)}`}</strong>
         </p>
         <p>Continue to Checkout?</p>
         <Button btnType="Danger" clicked={purchaseCancelled}>
            CANCEL
         </Button>
         <Button btnType="Success" clicked={purchaseContinued}>
            COONTINUE
         </Button>
      </Fragment>
   );
};

export default orderSummary;
