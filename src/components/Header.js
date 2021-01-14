import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import ExpenseForm from './ExpenseForm';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    return expenses.reduce(
      (acc, currentValue) => acc + (parseFloat(currentValue.value)
      * parseFloat(currentValue.exchangeRates[currentValue.currency].ask)), 0,
    );
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          email:
          { email }
        </div>
        <div data-testid="total-field">
          {/* Total: */}
          { this.sumExpenses(expenses).toString() }
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
