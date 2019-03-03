import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { IIngredients } from '../../../containers/BurgerBuilder/BurgerBuilderTypes';
import classes from './CheckoutSummary.module.css';

interface IProps {
   ingredients: IIngredients;
}

const containerStyle: React.CSSProperties = {
   width: '100%',
   margin: 'auto',
};

const checkoutSummary: React.FC<IProps> = ({ ingredients }) => (
   <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={containerStyle}>
         <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={() => {}}>
         CANCEL
      </Button>
      <Button btnType="Success" clicked={() => {}}>
         CONTINUE
      </Button>
   </div>
);

export default checkoutSummary;
