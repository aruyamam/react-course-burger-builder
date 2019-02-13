import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ ingredients }) => {
   let transformedIngredients = Object.keys(ingredients)
      .map(igKey => [...Array(ingredients[igKey])].map((_, i) => (
         <BurgerIngredient key={igKey + i} type={igKey} />
      )))
      .reduce((arr, el) => arr.concat(el), []);

   console.log(transformedIngredients);

   if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>;
   }

   return (
      <div className={classes.Burger}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   );
};

burger.propTypes = {
   ingredients: PropTypes.shape({
      bacon: PropTypes.number,
      cheese: PropTypes.number,
      meat: PropTypes.number,
      salad: PropTypes.number,
   }).isRequired,
};

export default burger;
