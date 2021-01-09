import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.total = this.total.bind(this);
  }

  total() {
    const { expenses } = this.props;
    const total = expenses.reduce((sum, expense) => {
      const { value, currency, exchangeRates } = expense;
      return sum + exchangeRates[currency].ask * value;
    }, 0);
    // return (total).toLocaleString('pt-BR', {
    //   minimumFractionDigits: 2,
    // });
    return +(parseFloat(total).toFixed(2));
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <img src="#" alt="Logo da Empresa" />
        <div>
          <span>E-mail: </span>
          <span data-testid="email-field">{ email }</span>
        </div>
        <div>
          <span>Despesa Total: </span>
          <span data-testid="total-field">{ this.total() }</span>
          <span data-testid="header-currency-field"> BRL</span>
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
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
