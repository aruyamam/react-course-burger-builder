import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = ({ label }) => (
   <div className={classes.BuildControl}>
      {console.log(label)}
      <div className={classes.Label}>{label}</div>
      <button type="button" className={classes.Less}>
         Less
      </button>
      <button type="button" className={classes.More}>
         More
      </button>
   </div>
);

export default BuildControl;
