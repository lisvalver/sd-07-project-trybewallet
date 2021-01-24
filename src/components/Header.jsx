import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">
          Email:
          { email }
        </h1>
        <span data-testid="total-field">
          Despesa Total: R$
          <ExpenseForm />
        </span>
        <span data-testid="header-currency-field">
          Moeda:
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
