import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Layout.module.css';

const layout = ({ children }) => (
   <Fragment>
      {console.log(children)}
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{children}</main>
   </Fragment>
);

layout.propTypes = {
   children: PropTypes.element.isRequired,
};

export default layout;
