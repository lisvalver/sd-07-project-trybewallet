import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { fetchData, newExpense, updateExpenses } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      form: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };

    this.filterCurrencies = this.filterCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((previouState) => ({
      form: { ...previouState.form, [name]: value },
    }));
  }

  filterCurrencies() {
    const { currencies } = this.props;
    const currenciesArray = Object.entries(currencies);
    const filteredCurrencies = currenciesArray.filter(
      (currency) => currency[0] !== 'USDT',
    );
    return filteredCurrencies;
  }

  updateFormState() {
    const { getCurrencies, saveExpenses, currencies } = this.props;
    getCurrencies();
    this.setState(
      (previousState) => ({
        form: { ...previousState.form, exchangeRates: currencies },
      }),
      () => {
        const { form } = this.state;
        saveExpenses(form);
        this.setState((previouState) => ({
          form: {
            currency: 'USD',
            description: '',
            exchangeRates: {},
            id: previouState.form.id + 1,
            method: 'Dinheiro',
            tag: 'Alimentação',
            value: 0,
          },
        }));
      },
    );
  }

  updateTotalExpensesFromAddBtn() {
    const { totalExpenses, updateExpensesProps } = this.props;
    const exchange = this.filterCurrencies();
    const {
      form: { value, currency },
    } = this.state;
    const exchangeRate = exchange.find((currencie) => currencie[0] === currency);
    const expense = value * exchangeRate[1].ask;

    const updatedTotalExpenses = (parseFloat(totalExpenses) + expense).toFixed(2);
    updateExpensesProps(updatedTotalExpenses);
  }

  handleSubmit() {
    this.updateTotalExpensesFromAddBtn();
    this.updateFormState();
  }

  render() {
    const { form } = this.state;
    const { email, totalExpenses } = this.props;
    const { value, description, currency, method, tag } = form;
    const filteredCurrencies = this.filterCurrencies();
    return (
      <div>
        <header>
          <div>
            <p data-testid="email-field">
              Olá,
              {' '}
              { email }
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Suas despesas totais são:
              {' '}
              {/** renderizar zero se expenses for [] */}
              { totalExpenses }
              <span data-testid="header-currency-field">
                {' '}
                BRL
              </span>
            </p>
          </div>
        </header>
        Valor:
        {' '}
        <input
          id="expenseValue"
          name="value"
          type="text"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
        Descrição:
        {' '}
        <input
          id="description"
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        Moeda:
        {' '}
        <select
          id="selectedCurrency"
          name="currency"
          type="text"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {filteredCurrencies.map((currCurrency) => (
            <option
              key={ currCurrency[0] }
              value={ currCurrency[0] }
              data-testid={ currCurrency[0] }
            >
              {currCurrency[0]}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleSubmit }>
          Adicionar Despesa
        </button>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchData()),
  saveExpenses: (expenses) => dispatch(newExpense(expenses)),
  updateExpensesProps: (totalExpenses) => dispatch(updateExpenses(totalExpenses)),
});

Wallet.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  updateExpensesProps: propTypes.func.isRequired,
  totalExpenses: propTypes.number.isRequired,
  currencies: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
  ]).isRequired,
  saveExpenses: propTypes.func.isRequired,
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
