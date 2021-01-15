import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      cambio: 'BRL',
    };
  }

  render() {
    const { cambio } = this.state;
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, item) => (
      acc + parseFloat(item.value) * parseFloat(item.exchangeRates[item.currency].ask)
    ), 0);
    return (
      <div>
        <header data-testid="email-field">
          {email}
        </header>
        <p data-testid="total-field">
          {`Total: ${total.toFixed(2)}`}
        </p>
        <p data-testid="header-currency-field">
          {`Cambio: ${cambio}`}
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
