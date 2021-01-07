import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          <strong>Email:</strong>
          {' '}
          { email }
        </p>
        <div className="total-field">
          <p data-testid="total-field">
            <strong>Despesa Total: R$</strong>
            {' '}
            {expenses.reduce((acc, expense) => {
              const { currency, exchangeRates, value } = expense;

              const exchangeRate = exchangeRates[currency].ask;
              const costInBRL = exchangeRate * value;

              return acc + parseFloat(costInBRL);
            }, 0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field"><strong>BRL</strong></p>
          <br />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
