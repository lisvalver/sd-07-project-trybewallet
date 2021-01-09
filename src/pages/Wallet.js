import React from "react";
import { connect } from "react-redux";
import { fetchCurrencies, saveExpenseAction, deleteExpense } from "../actions";

import Table from '../components/Table';
import ExpenseItem from '../components/ExpenseItem';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseId: 0,
      currencies: [],
      value: 0,
      currency: "",
      method: "",
      tag: "",
      description: "",
      totalCost: 0,
    };
  }

  totalCost = () => {
    const { expenses } = this.props;

    const totalCost = expenses.reduce((previous, current) => {
      const { value, currency, exchangeRates } = current
      return parseFloat(previous) + (parseFloat(value) * parseFloat(exchangeRates[currency]['ask']))
    }, [0])
    
    if (expenses.length > 0 ) this.setState({ totalCost: totalCost.toFixed(2) });
  }

  // componentDidUpdate() {
  //   const { expenses } = this.props
  //   this.totalCost(expenses);
  // }
  handleSaveExpense = async () => {
    const { value, currency, method, tag, description } = this.state;
    const { expenses, saveExpense } = this.props

    const expense = {
      id: expenses.length === 0 ? 0 : expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };

    await saveExpense(expense);
    this.totalCost(expenses)

  };

  async componentDidMount() {
    await this.props.updateCurrencies();
    this.setState({ currencies: this.props.currencyState });
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      currencies,
      value,
      currency,
      method,
      tag,
      description,
      totalCost,
    } = this.state;

    const { expenses } = this.props
    console.log('no render')
    console.log(expenses)

    return (
      <div>
        <h1>TrybeWallet</h1>
        <h2 data-testid="email-field">bem vindo:{this.props.emailProp} </h2>
        <label>
          Total de gastos:
            <h3 data-testid="total-field">{totalCost}</h3>
        </label>

        <label>
          Câmbio:
          <h3 data-testid="header-currency-field">BRL</h3>
        </label>

        <form>
          <label>
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={value}
              onChange={this.handleOnChange}
            />
          </label>

          <label>
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={description}
              onChange={this.handleOnChange}
            />
          </label>

          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={currency}
              onChange={this.handleOnChange}
            >
              {currencies.map((currency, index) => (
                <option data-testid={currency.code} key={index}>
                  {currency.code}
                </option>
              ))}
            </select>
          </label>

          <label>
            Metodo:
            <select
              data-testid="method-input"
              name="method"
              value={method}
              onChange={this.handleOnChange}
            >
              <option key="1">Dinheiro</option>
              <option key="2">Cartão de crédito</option>
              <option key="3">Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={tag}
              onChange={this.handleOnChange}
            >
              <option key="1">Alimentação</option>
              <option key="2">Lazer</option>
              <option key="3">Trabalho</option>
              <option key="4">Transporte</option>
              <option key="5">Saúde</option>
            </select>
          </label>
        </form>
        <button onClick={this.handleSaveExpense}>Adicionar despesa</button>
        <Table />
        {expenses.map(expense => <ExpenseItem key={expense.id} expense={expense} handleDelete={this.props.handleDeleteExpense} />)}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
