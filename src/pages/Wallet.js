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
      expenseValue: '',
      expenseMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
      expenseDescription: '',
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
    this.setState({ expenseValue: target.value });
  }

  handleMethod({ target }) {
    this.setState({ expenseMethod: target.value });
  }

  handleTag({ target }) {
    this.setState({ expenseTag: target.value });
  }

  handleDescription({ target }) {
    this.setState({ expenseDescription: target.value });
  }

  handleCurrency({ target }) {
    this.setState({ currencyField: target.value });
  }

  addData() {
    const { expenseValue,
      expenseMethod, expenseTag, expenseDescription, id, currencyField } = this.state;
    const { handleExpense } = this.props;
    const expense = {
      id,
      value: expenseValue,
      description: expenseDescription,
      currency: currencyField,
      method: expenseMethod,
      tag: expenseTag,
      exchangeRates: {},
    };
    this.setState({ id: id + 1 });
    handleExpense(expense);
  }

  render() {
    const { email, expenses } = this.props;
    const { currencyField,
      currencies,
      expenseValue,
      expenseMethod, expenseTag, expenseDescription } = this.state;
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
            value={ expenseValue }
            onChange={ (target) => this.handleInput(target) }
          />
          <input
            type="text"
            data-testid="description-input"
            value={ expenseDescription }
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
            value={ expenseMethod }
            data-testid="method-input"
            onChange={ (target) => this.handleMethod(target) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            value={ expenseTag }
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

          <tbody>
            {expenses.map(
              ({
                id,
                description,
                currency,
                value,
                method,
                tag,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    {(
                      Number(value) * Number(exchangeRates[currency].ask)
                    ).toFixed(2)}
                  </td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button type="button"> Review </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
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
