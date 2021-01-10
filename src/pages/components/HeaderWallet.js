import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(values) {
    return values.reduce((acc, currNumber) => acc + parseFloat(currNumber.value)
      * parseFloat(currNumber.exchangeRates[currNumber.currency].ask), 0);
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
          {`Valor: R$ ${this.sumExpenses(expenses)}`}
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
