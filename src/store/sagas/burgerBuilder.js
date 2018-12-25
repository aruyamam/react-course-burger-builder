import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import { setIngredients, fetchIngredientsFailed } from '../actions';

export function* initIngredientSaga() {
   try {
      const response = yield axios.get(
         'https://react-my-burger-96345.firebaseio.com/ingredients.json'
      );
      yield put(setIngredients(response.data));
   }
   catch (error) {
      yield put(fetchIngredientsFailed());
   }
}
