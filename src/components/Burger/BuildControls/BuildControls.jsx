import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' },
];

const buildControls = ({
   disabled, ingredientAdded, ingredientRemoved, price, purchasable,
}) => (
   <div className={classes.BuildControls}>
      <p>
         Current Price:
         {' '}
         <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
         <BuildControl
            added={() => ingredientAdded(ctrl.type)}
            disabled={disabled[ctrl.type]}
            key={ctrl.label}
            label={ctrl.label}
            removed={() => ingredientRemoved(ctrl.type)}
         />
      ))}
      <button className={classes.OrderButton} disabled={!purchasable} type="button">
         ORDER NOW
      </button>
   </div>
);

buildControls.propTypes = {
   disabled: PropTypes.shape({
      bacon: PropTypes.bool.isRequired,
      cheese: PropTypes.bool.isRequired,
      meat: PropTypes.bool.isRequired,
      salad: PropTypes.bool.isRequired,
   }).isRequired,
   ingredientAdded: PropTypes.func.isRequired,
   ingredientRemoved: PropTypes.func.isRequired,
   price: PropTypes.number.isRequired,
   purchasable: PropTypes.bool.isRequired,
};

export default buildControls;
