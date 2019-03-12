import React from 'react';
import classes from './Order.module.css';
import { IIngredients } from '../../containers/BurgerBuilder/BurgerBuilderTypes';

interface IProps {
   key: string;
   ingredients: IIngredients;
   price: number;
}

interface IOuputIngredients {
   name: string;
   amount: number;
}

const order: React.FC<IProps> = (props) => {
   const ingredients: IOuputIngredients[] = [];

   for (const ingredientName in props.ingredients) {
      if (props.ingredients.hasOwnProperty(ingredientName)) {
         ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
         });
      }
   }

   const ingredientOutput: JSX.Element[] = ingredients.map(ig => (
      <span
         style={{
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc',
            textTransform: 'capitalize',
         }}
         key={ig.name}
      >
         {`${ig.name} (${ig.amount})`}
      </span>
   ));

   return (
      <div className={classes.Order}>
         <p>
            Ingredients:
            {ingredientOutput}
         </p>
         <p>
            {'Price: '}
            <strong>
               USD
               {props.price.toFixed(2)}
            </strong>
         </p>
      </div>
   );
};

export default order;
