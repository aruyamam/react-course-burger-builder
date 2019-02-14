import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'salad' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' },
];

const buildControls = () => (
   <div className={classes.BuildControls}>
      {controls.map(ctrl => (
         <BuildControl key={ctrl.label} label={ctrl.label} />
      ))}
   </div>
);

export default buildControls;
