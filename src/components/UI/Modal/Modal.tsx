import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface IProps {
   children: React.ReactNode;
   toggleModal: () => void;
   show: boolean;
}

class Modal extends React.Component<IProps> {
   public shouldComponentUpdate(nextProps: IProps) {
      const { children, show } = this.props;

      return nextProps.show !== show || nextProps.children !== children;
   }

   public render() {
      const { children, toggleModal, show } = this.props;

      return (
         <Fragment>
            <Backdrop toggleVisibility={toggleModal} show={show} />
            <div
               className={classes.Modal}
               style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(-100vh)',
               }}
            >
               {children}
            </div>
         </Fragment>
      );
   }
}

export default Modal;
