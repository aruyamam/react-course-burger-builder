import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import { ICustomer } from '../../BurgerBuilder/BurgerBuilderTypes';

class ContactData extends Component {
   public readonly state: Readonly<ICustomer> = {
      name: '',
      email: '',
      address: {
         street: '',
         zipCode: '',
         country: '',
      },
   };

   public render() {
      return (
         <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
               <input type="text" name="name" placeholder="Your Name" />
               <input type="email" name="email" placeholder="Your Mail" />
               <input type="text" name="street" placeholder="Street" />
               <input type="text" name="postal" placeholder="Postal Code" />
               <Button btnType="Success" clicked={() => {}}>
                  ORDER
               </Button>
            </form>
         </div>
      );
   }
}

export default ContactData;
