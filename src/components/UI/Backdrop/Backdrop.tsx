import React from 'react';
import classes from './Backdrop.module.css';

interface Props {
   show: boolean;
   toggleVisibility: () => void;
}

const Backdrop: React.FC<Props> = ({ show, toggleVisibility }) =>
   show ? (
      <div onClick={toggleVisibility} className={classes.Backdrop} />
   ) : null;

export default Backdrop;
