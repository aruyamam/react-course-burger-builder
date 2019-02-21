import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

interface IProps {
   drawerToggleClicked: () => void;
}

const toolbar: React.FC<IProps> = ({ drawerToggleClicked }) => (
   <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.Logo}>
         <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
         <NavigationItems />
      </nav>
   </header>
);

export default toolbar;
