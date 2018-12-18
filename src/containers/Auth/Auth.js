import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { auth, setAuthRedirectPath } from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

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

   componentDidMount() {
      const {
         buildingBurger,
         authRedirectPath,
         onSetRedirectPath
      } = this.props;

      if (!buildingBurger && authRedirectPath !== '/') {
         onSetRedirectPath();
      }
   }

   inputChangedHandler = (event, controlName) => {
      const { controls } = this.state;
      const {
         target: { value }
      } = event;

      const updatedControls = updateObject(controls, {
         [controlName]: updateObject(controls[controlName], {
            value,
            valid: checkValidity(value, controls[controlName].validation),
            touched: true
         })
      });

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
      const { loading, error, isAuthenticated, authRedirectPath } = this.props;
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
            {isAuthenticated && <Redirect to={authRedirectPath} />}
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
   error: state.auth.error,
   isAuthenticated: state.auth.token !== null,
   buildingBurger: state.burgerBuilder.building,
   authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
   onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup)),
   onSetRedirectPath: () => dispatch(setAuthRedirectPath('/'))
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth);
