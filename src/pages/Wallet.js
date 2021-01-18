import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense, editedExpenseAction } from '../actions';
import Table from '../component/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.getCurrencyToElement = this.getCurrencyToElement.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      loadCurrencies: [],
    };
  }

  componentDidMount() {
    this.getCurrencyToElement();
  }

  getCurrencyToElement() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const currencySelector = document.getElementById('currency');
        const currenciesArray = Object.keys(data);
        this.setState({ loadCurrencies: data });
        currenciesArray.forEach((currency) => {
          if (currency !== 'USDT') {
            const addCurrency = document.createElement('option');
            addCurrency.value = currency;
            addCurrency.innerText = currency;
            addCurrency.setAttribute('data-testid', currency);
            currencySelector.appendChild(addCurrency);
          }
        });
      });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpense() {
    const { id } = this.state;
    const { add } = this.props;
    this.setState({ id: id + 1 });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    const { value, description, currency, method, tag } = this.state;
    add({ id, value, description, currency, method, tag });
  }

  totalExpenses() {
    const { store: { wallet: { expenses } } } = this.props;
    let totalExpenses = 0;
    expenses.map((expense) => {
      const { currency, exchangeRates, value } = expense;
      const myCurrency = exchangeRates[currency];
      totalExpenses += parseFloat(
        (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2),
      );
      return totalExpenses;
    });
    return totalExpenses;
  }

  editExpense() {
    const { idInEditing, store, confirmEditExpense } = this.props;
    const { wallet: { expenses } } = store;

    const {
      value,
      currency,
      tag,
      method,
      description,
      loadCurrencies,
    } = this.state;

    expenses[idInEditing].value = value;
    expenses[idInEditing].currency = currency;
    expenses[idInEditing].description = description;
    expenses[idInEditing].exchangeRates = loadCurrencies;
    expenses[idInEditing].method = method;
    expenses[idInEditing].tag = tag;
    confirmEditExpense(expenses[idInEditing]);
  }

  loadTable() {
    const { store } = this.props;
    const { wallet } = store;
    const { expenses } = wallet;
    if (expenses.length > 0) {
      return expenses.map((expense) => (
        <Table
          key={ expense.id }
          expense={ expense }
        />
      ));
    }
  }

  render() {
    const { store: { user: { email } }, inEditing } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const editingButton = (
      <button
        type="button"
        onClick={ this.editExpense }
      >
        Editar despesa
      </button>
    );

    const addingButton = (
      <button
        type="button"
        onClick={ this.saveExpense }
      >
        Adicionar despesa
      </button>
    );

    return (
      <div>
        <header>
          <div className="email-container">
            <div data-testid="email-field">{ email }</div>
          </div>
          <div className="total-expenses-container">
            <div data-testid="total-field">{ this.totalExpenses() }</div>
          </div>
          <div className="currency-container">
            <div data-testid="header-currency-field">BRL</div>
          </div>
        </header>
        <div className="form-insertions">
          <fieldset>
            <div className="expense-container">
              <div className="value">
                <label htmlFor="value">
                  Valor:
                  <input
                    name="value"
                    type="number"
                    step="0.01"
                    value={ value }
                    data-testid="value-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="description">
                <label htmlFor="description">
                  Descrição:
                  <input
                    name="description"
                    type="text"
                    value={ description }
                    data-testid="description-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="currency">
                <label htmlFor="currency">
                  Moeda:
                  <select
                    name="currency"
                    id="currency"
                    value={ currency }
                    data-testid="currency-input"
                    onChange={ this.handleChange }
                  >
                    <option>Selecione</option>
                  </select>
                </label>
              </div>
              <div className="payment-method">
                Método de pagamento:
                <select
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </div>
              <div className="tag">
                Tag:
                <select
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </div>
            </div>
          </fieldset>
          { inEditing ? editingButton : addingButton }
        </div>
        <div className="table-container">
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
              { this.loadTable() }
            </tbody>
          </table>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  store: state,
  inEditing: state.wallet.inEditing,
  idInEditing: state.wallet.idInEditing,
});

const mapDispatchToProps = (dispatch) => ({
  add: (object) => dispatch(addExpense(object)),
  confirmEditExpense: (expense) => dispatch(editedExpenseAction(expense, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  add: propTypes.func.isRequired,
  store: propTypes.shape({
    wallet: propTypes.shape({
      expenses: propTypes.arrayOf(propTypes.object),
    }),
    user: propTypes.shape({
      email: propTypes.string,
    }),
  }),
}.isRequired;
