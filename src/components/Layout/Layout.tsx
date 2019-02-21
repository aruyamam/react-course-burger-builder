import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

interface IProps {
   children: React.ReactNode;
}

interface IState {
   showSideDrawer: boolean;
}

class Layout extends Component<IProps> {
   public readonly state: Readonly<IState> = {
      showSideDrawer: false,
   };

   public sideDrawerToggleHandler = () => {
      this.setState((prevState: IState) => ({ showSideDrawer: !prevState.showSideDrawer }));
   };

   public render() {
      const { children } = this.props;
      const { showSideDrawer } = this.state;

      return (
         <Fragment>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer closed={this.sideDrawerToggleHandler} open={showSideDrawer} />
            <main className={classes.Content}>{children}</main>
         </Fragment>
      );
   }
}

export default Layout;
