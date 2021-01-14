import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies,
  saveExpenseAction,
  deleteExpense,
  updateExpense } from '../actions';

import Table from '../components/Table';
import ExpenseItem from '../components/ExpenseItem';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateCurrencies = this.handleUpdateCurrencies.bind(this);
    this.handleSaveExpense = this.handleSaveExpense.bind(this);
    this.totalCost = this.totalCost.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
    this.state = {
      currencies: [],
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      totalCost: 0,
      isEditing: false,
      editExpense: {},
    };
  }

  async componentDidMount() {
    const { updateCurrencies } = this.props;
    await updateCurrencies();
    this.handleUpdateCurrencies();
  }

  handleUpdateCurrencies() {
    const { currencyState } = this.props;
    this.setState({ currencies: currencyState });
  }

  async totalCost() {
    const { expenses } = this.props;

    const totalCost = await expenses.reduce((previous, current) => {
      const { value, currency, exchangeRates } = current;
      return parseFloat(previous)
      + (parseFloat(value)
      * parseFloat(exchangeRates[currency].ask)
      );
    }, [0]);

    if (expenses.length > 0) this.setState({ totalCost: totalCost.toFixed(2) });
  }

  async handleSaveExpense() {
    const { value, currency, method, tag, description } = this.state;
    const { expenses, saveExpense } = this.props;

    const expense = {
      id: expenses.length === 0 ? 0 : expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };

    await saveExpense(expense);
    this.totalCost();
  }

  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleEditExpense() {
    const { value, currency, method, tag, description, editExpense } = this.state;
    const { editExpenseItem } = this.props;
    const expenseItem = {
      id: editExpense.id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editExpense.exchangeRates,
    };
    await editExpenseItem(expenseItem);
    this.setState({ isEditing: false });
  }

  handleEdit(event, expense) {
    this.setState({
      isEditing: true,
      editExpense: expense,
      value: expense.value,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      description: expense.description,
    });
  }

  render() {
    const {
      currencies,
      value,
      currency,
      method,
      tag,
      description,
      totalCost,
      isEditing,
    } = this.state;

    const { expenses, handleDeleteExpense } = this.props;
    const { emailProp } = this.props;
    console.log(expenses);
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h2 data-testid="email-field">
          bem vindo:
          { emailProp }
        </h2>

        <label htmlFor="total">
          Total de gastos:
          <h3 id="total" data-testid="total-field">{ totalCost }</h3>
        </label>

        <h2>Câmbio:</h2>
        <h3 id="currency" data-testid="header-currency-field">BRL</h3>

        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleOnChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleOnChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleOnChange }
            >
              {currencies.map((item, index) => (
                <option data-testid={ item.code } key={ index }>
                  { item.code }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Metodo:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleOnChange }
            >
              <option key="1">Dinheiro</option>
              <option key="2">Cartão de crédito</option>
              <option key="3">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleOnChange }
            >
              <option key="1">Alimentação</option>
              <option key="2">Lazer</option>
              <option key="3">Trabalho</option>
              <option key="4">Transporte</option>
              <option key="5">Saúde</option>
            </select>
          </label>
        </form>
        <div>
          <button
            disabled={ !isEditing }
            type="button"
            onClick={ this.handleEditExpense }
          >
            Editar despesa
          </button>
          <button disabled={ isEditing } type="button" onClick={ this.handleSaveExpense }>
            Adicionar despesa
          </button>
        </div>
        <Table />
        <div>
          {expenses.map((expense) => (<ExpenseItem
            key={ expense.id }
            expense={ expense }
            handleDelete={ handleDeleteExpense }
            handleEdit={ this.handleEdit }
          />))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailProp: state.user.email,
  currencyState: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(saveExpenseAction(expense)),
  handleDeleteExpense: (e) => dispatch(deleteExpense(e.target.name)),
  editExpenseItem: (expense) => dispatch(updateExpense(expense)),
});

Wallet.propTypes = {
  editExpenseItem: PropTypes.func.isRequired,
  updateCurrencies: PropTypes.func.isRequired,
  currencyState: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  saveExpense: PropTypes.func.isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
  emailProp: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
