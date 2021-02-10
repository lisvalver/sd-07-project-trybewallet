import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.totalExpense = this.totalExpense.bind(this);
  }

  totalExpense() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, current) => (
      acc + current.value * current.exchangeRates[current.currency].ask
    ), 0);

    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p>
            <strong>Email: </strong>
            <span data-testid="email-field">{ email }</span>
          </p>
          <p>
            <strong>Despesa total: </strong>
            <span data-testid="total-field">{ this.totalExpense() }</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
