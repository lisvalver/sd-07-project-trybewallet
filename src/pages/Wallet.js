import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  sum() {
    const { currency } = this.props;
    const valor = currency.map(({ value, exchangeRates, currency: moeda }) => {
      const sum = value * exchangeRates[moeda].ask;
      return sum;
    });

    const sumTotal = valor.reduce((cur, acc) => cur + acc, 0);
    return sumTotal;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        <header data-testid="email-field">
          {email}
        </header>

        <p data-testid="total-field">
          {`Despesas: ${this.sum()}`}
        </p>

        <p data-testid="header-currency-field">
          Cambio: BRL
        </p>

        <Form />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currency: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
