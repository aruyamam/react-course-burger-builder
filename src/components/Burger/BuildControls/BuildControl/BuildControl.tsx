import React from 'react';
import classes from './BuildControl.module.css';

interface IProps {
   added: () => void;
   disabled: boolean;
   label: string;
   removed: () => void;
}

const buildControl: React.FC<IProps> = ({
   added, disabled, label, removed,
}) => (
   <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button onClick={removed} disabled={disabled} type="button" className={classes.Less}>
         Less
      </button>
      <button onClick={added} type="button" className={classes.More}>
         More
      </button>
   </div>
);

export default buildControl;
