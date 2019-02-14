import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const buildControl = ({ added, label }) => (
   <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button type="button" className={classes.Less}>
         Less
      </button>
      <button onClick={added} type="button" className={classes.More}>
         More
      </button>
   </div>
);

buildControl.propTyes = {
   added: PropTypes.func.isRequired,
   label: PropTypes.string.isRequired,
};

export default buildControl;
