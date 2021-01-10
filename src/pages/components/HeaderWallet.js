import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(values) {
    const allCosts = values.reduce((acc, currNumber) => acc + Number(currNumber.value)
      * Number(currNumber.exchangeRates[currNumber.currency].ask), 0);
    return allCosts.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <p>Trybe</p>
        <p data-testid="email-field">
          {`Email: ${email}`}
        </p>
        <span data-testid="total-field">
          {`Despesa Total: R$ ${this.sumExpenses(expenses)}`}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
