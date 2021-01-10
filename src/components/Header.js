import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      currentCurrency: 'BRL',
    };
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal() {
    const { expenses } = this.props;
    const result = expenses.reduce((acc, expense) => {
      const { currency, exchangeRates, value } = expense;
      const exchangeRate = exchangeRates[currency].ask;
      return acc + parseFloat(exchangeRate * value);
    }, 0).toFixed(2);
    return result;
  }

  render() {
    const { userEmail } = this.props;
    const { currentCurrency } = this.state;
    return (
      <div className="header-container">
        <h3 className="email-field" data-testid="email-field">
          { `Email: ${userEmail}` }
        </h3>
        <div className="total-container">
          <h4 data-testid="total-field">
            {'Despesa Total: R$ '}
            {this.updateTotal()}
          </h4>
          <h4 data-testid="header-currency-field">
            {currentCurrency}
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
