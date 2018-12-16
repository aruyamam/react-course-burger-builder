import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { auth } from '../../store/actions';

export class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Mail Address'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignup: true
   };

   checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
         return true;
      }

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }
      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
      }
      if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid;
      }
      if (rules.isNumeric) {
         const pattern = /^\d+$/;
         isValid = pattern.test(value) && isValid;
      }

      return isValid;
   }

   inputChangedHandler = (event, controlName) => {
      const { controls } = this.state;
      const {
         target: { value }
      } = event;

      const updatedControls = {
         ...controls,
         [controlName]: {
            ...controls[controlName],
            value,
            valid: this.checkValidity(value, controls[controlName].validation),
            touched: true
         }
      };

      this.setState({ controls: updatedControls });
   };

   submitHandler = event => {
      event.preventDefault();
      const {
         controls: { email, password },
         isSignup
      } = this.state;

      this.props.onAuth(email.value, password.value, isSignup);
   };

   swtichAuthModeHandler = () => {
      this.setState(prevState => ({ isSignup: !prevState.isSignup }));
   };

   render() {
      const { isSignup } = this.state;
      const { loading, error } = this.props;
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         });
      }

      let form = formElementsArray.map(formElement => (
         <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
         />
      ));

      if (loading) {
         form = <Spinner />;
      }

      return (
         <div className={classes.Auth}>
            {error && <p>{error.message}</p>}
            <form onSubmit={this.submitHandler}>
               {form}
               <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={this.swtichAuthModeHandler}>
               SWITCH TO {isSignup ? 'SIGNUP' : 'SIGNIN'}
            </Button>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   loading: state.auth.loading,
   error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
   onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup))
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth);