import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   SET_INGREDIENTS,
   FETCH_INGREDIENTS_FAILED,
   INIT_INGREDIENTS
} from './actionTypes';

export const addIngredient = ingredientName => ({
   type: ADD_INGREDIENT,
   ingredientName
});

export const removeIngredient = ingredientName => ({
   type: REMOVE_INGREDIENT,
   ingredientName
});

export const setIngredients = ingredients => ({
   type: SET_INGREDIENTS,
   ingredients
});

export const fetchIngredientsFailed = () => ({
   type: FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
   return {
      type: INIT_INGREDIENTS
   };
};
