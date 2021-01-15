import React from 'react';
// import * as api from '../services/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const { populateCurrenciesApi } = this.props;
    await populateCurrenciesApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { fetchRates } = this.props;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;
    await fetchRates(value, description, currency, paymentMethod, category);
    this.addExpenses();
    this.setState({
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    });
  }

  addExpenses() {
    const { wallet, sumTotal } = this.props;
    let sumValues = 0;
    let exchangeRateConverted;
    wallet.expenses.forEach((expenses, index) => {
      exchangeRateConverted = Object.values(wallet.expenses[index].exchangeRates);
      const data = exchangeRateConverted.find((rate) => rate.code === expenses.currency);
      sumValues += data.ask * expenses.value;
    });
    sumTotal(sumValues);
  }

  render() {
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;
    const { wallet } = this.props;
    return (
      <div className="App">
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Adicionar Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Selecionar moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              {/* Lógica do estudante Arthur Massaini: */}
              {/* https://github.com/tryber/sd-07-project-trybewallet/pull/35 */}
              {wallet.currencies.map((currencyCode) => (
                <option key={ currencyCode } data-testid={ currencyCode }>
                  {currencyCode}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesas
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  populateCurrenciesApi: Actions.populateCurrenciesApi,
  fetchRates: Actions.fetchRates,
  sumTotal: Actions.sumTotal,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

AddExpense.propTypes = {
  populateCurrenciesApi: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
  sumTotal: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf,
    expenses: PropTypes.arrayOf,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
