import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    return expenses.reduce((accum, currentValue) => accum
      + parseFloat(currentValue.value)
      * (parseFloat(currentValue.exchangeRates[currentValue.currency].ask)), 0);
  }

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <div>
        <div data-testid="email-field">{ userEmail }</div>
        <div data-testid="total-field">{ this.sumExpenses(expenses) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
