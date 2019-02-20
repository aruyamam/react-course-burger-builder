import React, { Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

interface Props {
   children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
   <Fragment>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>{children}</main>
   </Fragment>
);

export default Layout;
