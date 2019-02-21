import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
   children: React.ReactNode;
   toggleModal: () => void;
   show: boolean;
}

const Modal: React.FC<Props> = ({ children, toggleModal, show }) => (
   <Fragment>
      <Backdrop toggleVisibility={toggleModal} show={show} />
      <div
         className={classes.Modal}
         style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? 1 : 0,
         }}
      >
         {children}
      </div>
   </Fragment>
);

export default Modal;
