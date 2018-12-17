import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions';

export class Logout extends Component {
   componentDidMount() {
      const { onLogout, history } = this.props;

      onLogout(history.push(''));
   }

   render() {
      return <Redirect to="/" />;
   }
}

const mapDispatchToProps = dispatch => ({
   onLogout: () => dispatch(logout())
});

export default connect(
   null,
   mapDispatchToProps
)(Logout);
