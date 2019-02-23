import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { IIngredients } from '../../containers/BurgerBuilder/BurgerBuilderTypes';

interface IProps {
   ingredients: IIngredients;
}

const burger: React.FC<IProps> = ({ ingredients }) => {
   const transformedIngredients: React.ReactNode[] = Object.keys(ingredients)
      .map(igKey => [...Array(ingredients[igKey])].map((_, i) => (
         <BurgerIngredient key={igKey + i} type={igKey} />
      )))
      .reduce((arr, el) => arr.concat(el), []);

   if (transformedIngredients.length === 0) {
      transformedIngredients.push(<p key={1}>Please start adding ingredients!</p>);
   }

   return (
      <div className={classes.Burger}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   );
};

export default burger;
