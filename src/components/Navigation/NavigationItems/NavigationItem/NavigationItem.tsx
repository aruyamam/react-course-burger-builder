import React from 'react';
import classes from './NavigationItem.module.css';

interface Props {
   active?: boolean;
   children: React.ReactNode;
   link: string;
}

const NavigationItem: React.FC<Props> = ({ active, children, link }) => (
   <li className={classes.NavigationItem}>
      <a href={link} className={active ? classes.active : ''}>
         {children}
      </a>
   </li>
);

export default NavigationItem;
