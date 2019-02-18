import React from 'react';
import classes from './Button.module.css';

interface Props {
   btnType: string;
   clicked: () => void;
   children: React.ReactNode;
}

const Button: React.FC<Props> = ({ btnType, clicked, children }) => (
   <button className={[classes.Button, classes[btnType]].join(' ')} onClick={clicked}>
      {children}
   </button>
);

export default Button;
