import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const expensesTotal = expenses.reduce((expense, acc) => expense + acc, 0);
    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ expensesTotal }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}).isRequired;

const mapStatetoProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

export default connect(mapStatetoProps)(Header);
