import axios from '../../axios-orders';
import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   SET_INGREDIENTS,
   FETCH_INGREDIENTS_FAILED
} from './actionTypes';

export const addIngredient = ingredientName => ({
   type: ADD_INGREDIENT,
   ingredientName
});

export const removeIngredient = ingredientName => ({
   type: REMOVE_INGREDIENT,
   ingredientName
});

const setIngredients = ingredients => ({
   type: SET_INGREDIENTS,
   ingredients
});

export const fetchIngredientsFailed = () => ({
   type: FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
   axios
      .get('https://react-my-burger-96345.firebaseio.com/ingredients.json')
      .then(response => {
         dispatch(setIngredients(response.data));
      })
      .catch(error => {
         fetchIngredientsFailed();
      });
};
