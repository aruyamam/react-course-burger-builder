import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const buildControl = ({
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

buildControl.propTypes = {
   added: PropTypes.func.isRequired,
   disabled: PropTypes.bool.isRequired,
   label: PropTypes.string.isRequired,
   removed: PropTypes.func.isRequired,
};

export default buildControl;
