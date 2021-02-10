import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import apiCurrencies from '../services/apiCurrency';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    // this.expensesSum = this.expenseSum.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const currencyApi = await apiCurrencies();
    const currenciesObject = (Object.keys(currencyApi));
    currenciesObject.splice(1, 1);
    this.setState({ currencies: currenciesObject });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  addExpenses() {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatchAddExpenses } = this.props;
    this.setState({ id: id + 1 });
    dispatchAddExpenses({ id, value, description, currency, method, tag });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  /* expenseSum() {
    const { expenses } = this.props;
    let totalValue = 0;
    expenses.map((expense) => {
      const { value, currency, exchangeRates } = expense;
      const currentCurrency = exchangeRates[`${currency}`];
      totalValue += parseFloat(
        parseFloat(value) * parseFloat(currentCurrency.ask).toFixed(2),
      );
      return totalValue;
    });
  } */

  render() {
    const { value, description, currency, currencies, method, tag } = this.state;
    return (
      <div className="container">
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ (e) => this.handleChange(e) }
              placeholder="0,00"
            />
          </label>
          <label htmlFor="description-input">
            Descrição de despesas
            <input
              name="description"
              value={ description }
              type="text"
              data-testid="description-input"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ (e) => this.handleChange(e) }
            >
              {currencies.map((cur) => (
                <option
                  data-testid={ cur }
                  value={ cur }
                  key={ cur }
                >
                  {cur}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Forma de pagamento
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-crédito">Cartão de crédito</option>
              <option value="cartao-débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="method-input">
            Categoria
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.addExpenses() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExpenses: (value) => dispatch(fetchCurrencies(value)),
});

ExpenseForm.propTypes = {
  dispatchAddExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
