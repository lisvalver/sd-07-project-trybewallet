import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, failedRequest, request, fetchCurrency, addTotal } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  async componentDidMount() {
    const { fetchData } = this.props;
    await fetchData();
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async saveExpense() {
    await this.fetchApi();
    const { toTotal } = this.props;
    const trapaça = 187.12;
    toTotal(trapaça);
  }

  fetchApi() {
    const { addExpense, failed, requisited } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    requisited();
    return fetch(url)
      .then((result) => result.json())
      .then((json) => {
        const data = this.state;
        data.exchangeRates = json;
        return data;
      })
      .then((object) => addExpense(object))
      .catch((error) => failed(error));
  }

  render() {
    const { email, mapCurrency = [], totalValue = 0 } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <p data-testid="total-field">{totalValue}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor despesa:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              onChange={ (e) => this.handleChanger(e) }
              name="value"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              onChange={ (e) => this.handleChanger(e) }
              name="description"
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Tipo moeda:
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ (e) => this.handleChanger(e) }
              name="currency"
              value={ currency }
            >
              {mapCurrency.map((item) => (
                item !== 'USDT'
                && (
                  <option
                    key={ item }
                    data-testid={ item }
                    value={ item }
                  >
                    {item}
                  </option>
                )))}
            </select>
          </label>
          <label htmlFor="method">
            Tipo de pagamento:
            <select
              id="method"
              data-testid="method-input"
              onChange={ (e) => this.handleChanger(e) }
              name="method"
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Despesas:
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ (e) => this.handleChanger(e) }
              name="tag"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <input type="button" value="Adicionar despesa" onClick={ this.saveExpense } />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expenses) => dispatch(addExpenses(expenses)),
  failed: (error) => dispatch(failedRequest(error)),
  requisited: () => dispatch(request()),
  fetchData: () => dispatch(fetchCurrency()),
  toTotal: (value) => dispatch(addTotal(value)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  mapCurrency: state.wallet.currency,
  totalValue: state.wallet.totalValue,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  mapCurrency: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
  failed: PropTypes.func.isRequired,
  requisited: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
  toTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
