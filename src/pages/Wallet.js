import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoedaAPI } from '../actions';
import CoinOption from '../componentes/CoinOption';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      method: 'Dinheiro',
      currency: 'BRL',
      tag: 'Alimentação',
      atualExpenses: 0,
      total: 0,
    };
  }

  componentDidMount() {
    const { getAPI } = this.props;
    getAPI();
  }

  render() {
    const { email, currencies } = this.props;
    const { atualExpenses, currency } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h4 data-testid="total-field">{ atualExpenses }</h4>
          <h4 data-testid="header-currency-field">{ currency }</h4>
        </header>
        <form>
          <label htmlFor="addExpenses">
            Adicione valor da despesa
            <input name="addExpenses" type="number" data-testid="value-input" />
          </label>
          <label htmlFor="discription">
            Descrição da despesa
            <input name="discription" type="text" data-testid="description-input" />
          </label>
          <label htmlFor="options">
            <CoinOption name="options"/>
          </label>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(fetchMoedaAPI()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
