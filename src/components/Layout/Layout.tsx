import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

interface Props {
   children: React.ReactNode;
}

class Layout extends Component {
   state = {
      showSideDrawer: true,
   };

   sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false });
   };

   render() {
      const { children } = this.props;
      const { showSideDrawer } = this.state;

      return (
         <Fragment>
            <Toolbar />
            <SideDrawer closed={this.sideDrawerClosedHandler} open={showSideDrawer} />
            <main className={classes.Content}>{children}</main>
         </Fragment>
      );
   }
}

export default Layout;
