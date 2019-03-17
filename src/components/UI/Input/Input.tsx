import React, { ChangeEvent } from 'react';
import classes from './Input.module.css';
import { IElementConfig } from '../../../containers/Checkout/ContactData/ContactDataType';

interface IProp {
   changed: (event: ChangeEvent) => void;
   elementConfig: IElementConfig;
   elementType: string;
   label?: string;
   value: string;
}

const Input: React.FC<IProp> = ({
   changed, elementType, elementConfig, label, value,
}) => {
   let inputElement: JSX.Element | null = null;
   console.log(elementType);

   switch (elementType) {
      case 'input':
         inputElement = (
            <input
               className={classes.InputElement}
               {...elementConfig}
               value={value}
               onChange={changed}
            />
         );
         break;

      case 'textarea':
         inputElement = (
            <textarea
               className={classes.InputElement}
               {...elementConfig}
               value={value}
               onChange={changed}
            />
         );
         break;

      case 'select':
         inputElement = (
            <select className={classes.InputElement} value={value} onChange={changed}>
               {elementConfig.options.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.displayValue}
                  </option>
               ))}
            </select>
         );
         break;

      default:
         inputElement = <input className={classes.InputElement} {...elementConfig} value={value} />;
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
