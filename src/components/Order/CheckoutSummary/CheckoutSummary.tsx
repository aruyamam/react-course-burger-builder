import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { IIngredients } from '../../../containers/BurgerBuilder/BurgerBuilderTypes';
import classes from './CheckoutSummary.module.css';

interface IProps {
   checkoutCancelled: () => void;
   checkoutContinued: () => void;
   ingredients: IIngredients;
}

const containerStyle: React.CSSProperties = {
   width: '100%',
   margin: 'auto',
};

const checkoutSummary: React.FC<IProps> = ({
   checkoutCancelled,
   checkoutContinued,
   ingredients,
}) => (
   <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={containerStyle}>
         <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
         CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
         CONTINUE
      </Button>
   </div>
);

export default checkoutSummary;
