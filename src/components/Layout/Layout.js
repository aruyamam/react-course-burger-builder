import React, { Fragment } from 'react';

const layout = ({ children }) => (
   <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>{children}</main>
   </Fragment>
);

export default layout;
