import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiAction, updateExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.updateStateInputs = this.updateStateInputs.bind(this);
    this.getCurrencyList = this.getCurrencyList.bind(this);
    this.newExpensive = this.newExpensive.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { callApi } = this.props;
    callApi();
  }

  getCurrencyList() {
    const { currencies } = this.props;
    const currencyList = Object.keys(currencies);
    return currencyList.filter((currency) => currency !== 'USDT');
  }

  newExpensive() {
    const { saveNewExpensive } = this.props;
    saveNewExpensive(this.state);
  }

  updateStateInputs({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, totalExpense = 0 } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const currencyList = this.getCurrencyList();

    return (
      <main>
        <header>
          <p>
            Email:
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { totalExpense }
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </header>

        <fieldset>
          <legend>Tabela de gastos</legend>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              id="value"
              type="number"
              placeholder="ex: 00.00"
              value={ value }
              onChange={ this.updateStateInputs }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              id="description"
              type="text"
              placeholder="ex: Compra de mês"
              value={ description }
              onChange={ this.updateStateInputs }
            />
          </label>
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.updateStateInputs }
            >
              {currencyList.map((currentCurrency) => (
                <option key={ currentCurrency } data-testid={ currentCurrency }>
                  { currentCurrency }
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.updateStateInputs }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.updateStateInputs }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.newExpensive }
          >
            Adicionar despesa
          </button>
        </fieldset>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

const mapDispatchToProps = (dispatch) => ({
  callApi: () => dispatch(apiAction()),
  saveNewExpensive: (localState) => dispatch(updateExpenses(localState)),
});

Wallet.propTypes = {
  callApi: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveNewExpensive: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
