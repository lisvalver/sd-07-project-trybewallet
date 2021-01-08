import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends React.Component {
  totalField(expenses) {
    if (expenses.length !== 0) {
      const valuesExpenses = expenses.map((expense) => {
        const { value, currency, exchangeRates } = expense;

        const valueBRL = parseInt(value, 10) * exchangeRates[currency].ask;

        return Math.round(valueBRL * 100) / 100;
      });

      const sumExpenses = valuesExpenses.reduce((a, b) => a + b);
      return sumExpenses;
    }
    return 0;
  }

  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <header className="header-user">
        <div>TrybeWallet</div>
        <div data-testid="email-field">
          Email:
          {email}
        </div>
        <div data-testid="total-field">
          Despesa Total:
          {' '}
          {this.totalField(expenses)}
        </div>
        <div data-testid="header-currency-field">Currency: BRL</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(HeaderWallet);

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};
