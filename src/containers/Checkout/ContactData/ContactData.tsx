import React, { Component, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import { ICustomer, IIngredients, IOrder } from '../../BurgerBuilder/BurgerBuilderTypes';

interface IProps {
   ingredients: IIngredients;
   totalPrice: number;
}

interface IState {
   loading: boolean;
}

class ContactData extends Component<RouteComponentProps & IProps, ICustomer & IState> {
   public readonly state = {
      name: '',
      email: '',
      address: {
         street: '',
         zipCode: '',
         country: '',
      },
      loading: false,
   };

   public orderHandler = (event: MouseEvent) => {
      event.preventDefault();
      this.setState({ loading: true });

      const { history, ingredients, totalPrice } = this.props;
      const order: IOrder = {
         ingredients,
         price: totalPrice,
         customer: {
            address: {
               country: 'Germany',
               street: 'Teststreet 1',
               zipCode: '41351',
            },
            email: 'test@test.com',
            name: 'Max Schwarzmuller',
         },
         deliverMethod: 'fastest',
      };

      axios
         .post<IOrder>('/orders.json', order)
         .then((response) => {
            this.setState({ loading: false });
            history.push('/');
         })
         .catch((error) => {
            console.log(error);
            this.setState({
               loading: false,
            });
         });
   };

   public render() {
      const { loading } = this.state;

      return (
         <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {loading ? (
               <Spinner />
            ) : (
               <form>
                  <input type="text" name="name" placeholder="Your Name" />
                  <input type="email" name="email" placeholder="Your Mail" />
                  <input type="text" name="street" placeholder="Street" />
                  <input type="text" name="postal" placeholder="Postal Code" />
                  <Button btnType="Success" clicked={this.orderHandler}>
                     ORDER
                  </Button>
               </form>
            )}
         </div>
      );
   }
}

export default ContactData;
