import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { IDisabledInfo } from '../../../containers/BurgerBuilder/BurgerBuilderTypes';

interface IProps {
   disabled: IDisabledInfo;
   ingredientAdded: (type: string) => void;
   ingredientRemoved: (type: string) => void;
   ordered: () => void;
   price: number;
   purchasable: boolean;
}

interface IControl {
   label: string;
   type: string;
}

const controls: IControl[] = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' },
];

const buildControls: React.FC<IProps> = ({
   disabled,
   ingredientAdded,
   ingredientRemoved,
   ordered,
   price,
   purchasable,
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
      <button
         onClick={ordered}
         className={classes.OrderButton}
         disabled={!purchasable}
         type="button"
      >
         ORDER NOW
      </button>
   </div>
);

export default buildControls;
