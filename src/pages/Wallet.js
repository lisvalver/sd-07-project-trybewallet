import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalField: 0,
      currencyField: 'BRL',
      currencies: [],
      value: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: 0,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const list = Object.keys(data).filter((value) => value !== 'USDT');
    this.setState({ currencies: list });
  }

  updateExpenses(expenses) {
    if (expenses.length !== 0) {
      const { totalField } = this.state;
      let finalValue = totalField;
      expenses.forEach((obj) => {
        const { value, exchangeRates, currency } = obj;

        Object.keys(exchangeRates).forEach((rate) => {
          const { ask, code, codein } = exchangeRates[rate];

          if (code === currency && codein !== 'BRLT') {
            finalValue += (parseFloat(value) * parseFloat(ask));
          }
        });
      });
      return parseFloat(finalValue.toFixed(2));
    }
    return 0;
  }

  handleInput({ target }) {
    this.setState({ value: target.value });
  }

  handleMethod({ target }) {
    this.setState({ method: target.value });
  }

  handleTag({ target }) {
    this.setState({ tag: target.value });
  }

  handleDescription({ target }) {
    this.setState({ description: target.value });
  }

  handleCurrency({ target }) {
    this.setState({ currencyField: target.value });
  }

  addData() {
    const { value, method, tag, description, id, currencyField } = this.state;
    const { handleExpense } = this.props;
    const expense = {
      id,
      value,
      description,
      currency: currencyField,
      method,
      tag,
      exchangeRates: {},
    };
    this.setState({ id: id + 1 });
    handleExpense(expense);
  }

  render() {
    const { email, expenses } = this.props;
    const { currencyField, currencies, value, method, tag, description } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.updateExpenses(expenses)}</p>
          <p data-testid="header-currency-field">{currencyField}</p>
        </header>
        <form>
          <input
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ (target) => this.handleInput(target) }
          />
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ (target) => this.handleDescription(target) }
          />
          <select
            value="BRL"
            onChange={ (target) => this.handleCurrency(target) }
            data-testid="currency-input"
          >
            {currencies.map(
              (currency) => (
                <option
                  key={ currency.id }
                  data-testid={ currency }
                >
                  {currency}
                </option>),
            )}
          </select>

          <select
            value={ method }
            data-testid="method-input"
            onChange={ (target) => this.handleMethod(target) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            value={ tag }
            data-testid="tag-input"
            onChange={ (target) => this.handleTag(target) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <button
            type="button"
            onClick={ () => this.addData() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleExpense: (expense) => dispatch(getCurrencies(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
