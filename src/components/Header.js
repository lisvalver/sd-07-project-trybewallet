import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses(expenses) {
    return expenses
      .reduce(
        (acc, currValue) => acc + (parseFloat(currValue.value)
          * parseFloat(currValue.exchangeRates[currValue.currency].ask)), 0
      );
  }

  render() {
    const { email, expenses } = this.props;
    // const INITIAL_EXPENSES = 0;
    return (
      <div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{ this.totalExpenses(expenses).toString() }</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
