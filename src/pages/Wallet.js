import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

import FormDespesa from '../components/FormDespesa';
import TabelaGastos from '../components/TabelaGastos';

class Wallet extends React.Component {
  constructor() {
    super();
    this.fetchTest = this.fetchTest.bind(this);
  }

  componentDidMount() {
    this.fetchTest();
  }

  async fetchTest() {
    const { fetchCurrenciesThunk } = this.props;
    await fetchCurrenciesThunk();
  }

  render() {
    const { user, wallet } = this.props;

    return (
      <div>
        <header className="header">
          <p>Carteira - Trybe Wallet</p>
          <p data-testid="email-field">
            Email:
            {user.email}
          </p>
          <p data-testid="total-field">
            Despesa Total: R$ 0
            { wallet.sum }
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </header>

        <FormDespesa currencies={ wallet.currencies } />
        <TabelaGastos />
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  fetchCurrenciesThunk: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        codein: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    sum: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = {
  fetchCurrenciesThunk: Actions.fetchCurrenciesThunk,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
