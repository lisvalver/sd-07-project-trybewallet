import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    return expenses.reduce((acc, curr) => Math.round((acc
      + (parseFloat(curr.value)
      * parseFloat(curr.exchangeRates[curr.currency].ask))) * 100)
      / 100, 0);
  }

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{ userEmail }</p>
          <p data-testid="total-field">{ this.sumExpenses(expenses) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
