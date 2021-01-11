import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, fetchExchange } from '../actions';
import fetchCurrencyApi from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.setInputState = this.setInputState.bind(this);
    this.sendExpense = this.sendExpense.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  setInputState({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async fetchCurrencies() {
    const { fetchCurrencies } = this.props;

    try {
      const currencies = await fetchCurrencyApi();
      fetchCurrencies(
        Object.entries(currencies)
          .filter((currency) => currency[0] !== 'USDT')
          .map((currency) => currency[1]),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendExpense(event) {
    event.preventDefault();

    const { getExchange, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    getExchange({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  render() {
    const { email, currencies, total, expenses } = this.props;
    const { value } = this.state;

    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            Email:
            { email }
          </h2>
          <p data-testid="total-field">
            { total || 0 }
          </p>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
        <form>
          <section>
            <label htmlFor="value-input">
              Valor da despesa
              <input
                onChange={ this.setInputState }
                name="value"
                id="value-input"
                data-testid="value-input"
                type="number"
                value={ value }
              />
            </label>
          </section>
          <section>
            <label htmlFor="description-input">
              Descrição da despesa:
              <input
                onChange={ this.setInputState }
                name="description"
                id="description-input"
                data-testid="description-input"
                type="text"
              />
            </label>
          </section>
          <section>
            <label htmlFor="description-input">
              Moeda:
              <select
                onChange={ this.setInputState }
                name="currency"
                data-testid="currency-input"
              >
                {currencies.map((currency) => (
                  <option
                    key={ currency.code }
                    data-testid={ currency.code }
                  >
                    { currency.code }
                  </option>
                ))}
              </select>
            </label>
          </section>
          <section>
            <label htmlFor="method">
              Método de pagamento:
              <select
                id="method"
                onChange={ this.setInputState }
                name="method"
                data-testid="method-input"
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
          </section>
          <section>
            <label htmlFor="category">
              Categoria:
              <select
                id="category"
                onChange={ this.setInputState }
                name="tag"
                data-testid="tag-input"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
          </section>
          <section>
            <button type="button" onClick={ this.sendExpense }>Adicionar despesa</button>
          </section>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses ? expenses.map((expense, index) => (
              <tbody key={ index }>
                <tr>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>{ (+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                  <td>
                    {
                      (expense.value * expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                </tr>
              </tbody>
            )) : ''
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  getExchange: (currencies) => dispatch(fetchExchange(currencies)),
  fetchCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getExchange: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
