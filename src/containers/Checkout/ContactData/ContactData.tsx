import React, { Component, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import { ICustomer, IIngredients, IOrder } from '../../BurgerBuilder/BurgerBuilderTypes';
import { IOrderForm } from './ContactDataType';

interface IProps {
   ingredients: IIngredients;
   totalPrice: number;
}

interface IState {
   orderForm: IOrderForm;
   loading: boolean;
}

class ContactData extends Component<RouteComponentProps & IProps, IState> {
   public readonly state: IState = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name',
            },
            value: '',
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street',
            },
            value: '',
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'ZIP Code',
            },
            value: '',
         },
         country: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Country',
            },
            value: '',
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your E-Mail',
            },
            value: '',
         },
         deliverMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  {
                     value: 'fastest',
                     displayValue: 'Fastest',
                  },
                  {
                     value: 'cheapest',
                     displayValue: 'Cheapest',
                  },
               ],
            },
            value: '',
         },
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

   inputChangeHandler = (event) => {};

   public render() {
      const { loading, orderForm } = this.state;
      const formElementsArray = [];
      for (const key in orderForm) {
         if (orderForm.hasOwnProperty(key)) {
            formElementsArray.push({
               id: key,
               config: orderForm[key],
            });
         }
      }

      return (
         <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {loading ? (
               <Spinner />
            ) : (
               <form>
                  {formElementsArray.map(formElement => (
                     <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={this.inputChangeHandler}
                     />
                  ))}
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
