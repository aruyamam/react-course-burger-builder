import React, { MouseEvent } from 'react';
import classes from './Button.module.css';

interface IProps {
   btnType: string;
   clicked: (event: MouseEvent) => void;
   children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ btnType, clicked, children }) => (
   <button className={[classes.Button, classes[btnType]].join(' ')} onClick={clicked}>
      {children}
   </button>
);

export default Button;
