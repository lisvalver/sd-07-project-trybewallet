import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.totalExpenses = this.totalExpenses.bind(this);

    this.state = {
      currency: 'BRL',
    };
  }

  totalExpenses() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    let totalExpenses = 0;
    expenses.map((expense) => {
      const { currency, exchangeRates, value } = expense;
      const myCurrency = exchangeRates[`${currency}`];
      totalExpenses += parseFloat(
        (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2),
      );
      return totalExpenses;
    });
    return totalExpenses;
  }

  render() {
    const { validLogin } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <div data-testid="email-field">
          <span>{validLogin.email}</span>
        </div>
        <div data-testid="total-field">
          <span>{this.totalExpenses()}</span>
        </div>
        <div data-testid="header-currency-field">
          <span>{currency}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  validLogin: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  validLogin: PropTypes.string.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.object).isRequired,
};
