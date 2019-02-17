import React from 'react';
import classes from './Backdrop.module.css';

interface Props {
   show: boolean;
   toggleModal: () => void;
}

const Backdrop: React.FC<Props> = ({ show, toggleModal }) => (show ? <div onClick={toggleModal} className={classes.Backdrop} /> : null);

export default Backdrop;
