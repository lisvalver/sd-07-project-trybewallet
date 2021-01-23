import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    let total = 0;
    const { expense } = this.props;
    expense.map((exp) => {
      const { currency, exchangeRates, value } = exp;
      const myCurrency = exchangeRates[`${currency}`];
      total += parseFloat((parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2));
      return total;
    });
    return total;
  }

  render() {
    const { email } = this.props;
    const totalExpense = this.totalExpenses();

    return (
      <div id="header">
        <span id="header" data-testid="email-field">{email}</span>
        <span id="header" data-testid="total-field">{totalExpense}</span>
        <span id="header" data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
