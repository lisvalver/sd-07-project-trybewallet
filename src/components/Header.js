import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses() {
    const { expenses } = this.props;
    console.log(expenses);
    if (expenses.length === 0) return 0;
    let result = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      result += value * exchangeRates[currency].ask;
    });
    return Number(result).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
        <span data-testid="total-field">
          Despesa total:
          {this.sumExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
