import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface IProps {
   closed: () => void;
   open: boolean;
}

const sideDrawer: React.FC<IProps> = ({ closed, open }) => {
   let attachedClasses = [classes.SideDrawer, classes.Close];
   if (open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
   }

   return (
      <Fragment>
         <Backdrop show={open} toggleVisibility={closed} />
         <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
               <Logo />
            </div>
            <nav>
               <NavigationItems />
            </nav>
         </div>
      </Fragment>
   );
};

export default sideDrawer;
