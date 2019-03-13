import React from 'react';
import classes from './Input.module.css';

interface IProp {
   inputType: string;
   label: string;
   name: string;
   placeholder: string;
   type: string;
}

const Input: React.FC<IProp> = ({ inputType, label, ...rest }) => {
   let inputElement: JSX.Element | null = null;

   switch (inputType) {
      case 'input':
         inputElement = <input className={classes.InputElement} {...rest} />;
         break;

      case 'textarea':
         inputElement = <textarea className={classes.InputElement} {...rest} />;

      default:
         inputElement = <input className={classes.InputElement} {...rest} />;
         break;
   }

   return (
      <div className={classes.Input}>
         <label className={classes.Label}>{label}</label>
         {inputElement}
      </div>
   );
};

export default Input;
