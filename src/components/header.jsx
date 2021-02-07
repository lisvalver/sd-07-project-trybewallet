import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getEmail, expenses } = this.props;
    const totalValue = expenses.reduce((acc, despesa) => {
      const cot = despesa.exchangeRates[despesa.currency].ask;
      return acc + (parseFloat(despesa.value) * parseFloat(cot));
    }, 0).toFixed(2); // Auxiliado pelo EmbaixaTryber Rafael Machado Guimarães

    return (
      <div>
        <div data-testid="email-field">
          E-mail:
          { getEmail }
        </div>
        <div data-testid="total-field">
          { totalValue }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
