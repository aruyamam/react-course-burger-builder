import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

interface IProps {
   children: React.ReactNode;
   exact?: boolean;
   link: string;
}

const NavigationItem: React.FC<IProps> = ({ children, exact, link }) => (
   <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} exact={exact} to={link}>
         {children}
      </NavLink>
   </li>
);

export default NavigationItem;
