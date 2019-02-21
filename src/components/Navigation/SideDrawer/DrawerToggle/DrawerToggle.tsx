import React from 'react';
import classes from './DrawerToggle.module.css';

interface IProps {
   clicked: () => void;
}

const drawerToggle: React.FC<IProps> = ({ clicked }) => (
   <div onClick={clicked} className={classes.DrawerToggle}>
      <div />
      <div />
      <div />
   </div>
);

export default drawerToggle;
