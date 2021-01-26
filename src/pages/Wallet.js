// Esse projeto teve a ajuda e orientação do aluno Tiago Esdras

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import ExpensesForm from '../Components/FormExpenses';
import fetchCurrency from '../APIs';
import { fetchCurrencyAction, deleteExpense, editExpenses, thisEditing, addEdicao } from '../actions';
import Table from '../Components/Table';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      arrayCurrencyFiltered: [],
      totalExpenses: 0,
    };

    this.fetchCurrencyType = this.fetchCurrencyType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.editingExpenseProps = this.editingExpenseProps.bind(this);
    this.buttonEditarTab = this.buttonEditarTab.bind(this);
    this.handleChangeExpense = this.handleChangeExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencyType();
  }

  handleChange({ target }) {
    const { expense } = this.state;
    const { value, name } = target;
    this.setState({
      expense: { ...expense, [name]: value },
    });
  }

  async fetchCurrencyType() {
    const allCurrency = await fetchCurrency();
    const arrayCurrency = Object.keys(allCurrency);
    const arrayCurrencyFiltered = arrayCurrency.filter((currency) => currency !== 'USDT');
    this.setState({
      arrayCurrencyFiltered,
    });
    // console.log(arrayCurrencyFiltered);
  }

  calcExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);
    this.setState({
      totalExpenses,
    });
  }

  eraseState() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }), console.log('eraseState'));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { addExpenseProps, editing } = this.props;
    editing(false);
    addExpenseProps(expense)
      .then(() => this.calcExpenses())
      .then(() => this.eraseState());
  }

  handleChangeExpense(event) {
    event.preventDefault();
    const { editing, addChangeEditDispatch } = this.props;
    editing(false);
    const { expenses: expensesToSendEdit } = this.state;
    addChangeEditDispatch(expensesToSendEdit);
    this.setState({
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    });
  }

  buttonEditarTab(expenses) {
    const { editing } = this.props;
    editing(true);
    this.setState({
      expenses,
    });
  }

  // buttonEditarTab(id) {
  //   const {wallet, editExpenseProps, editing} = this.props;
  //   const { expense } = this.state;
  //   editExpenseProps(id);
  //   console.log('expense = ', expense);
  //   console.log('editExpenses = ', editExpenses);
  //   editing(true);
  //   this.setState({
  //     expense: editExpenses,
  //   });
  // }

  render() {
    const { user, expenses, deleteExpenseProps, editExpenseProps } = this.props;
    // console.log(this.props);
    const { arrayCurrencyFiltered, totalExpenses } = this.state;
    return (
      <div>
        <Header
          user={user}
          totalExpenses={totalExpenses}
        />
        <ExpensesForm
          state={this.state}
          arrayCurrencyFiltered={arrayCurrencyFiltered}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleChangeExpense={this.handleChangeExpense}
        />
        <Table
          expenses={expenses}
          deleteExpenseProps={deleteExpenseProps}
          // editExpenseProps={editExpenseProps}
          buttonEditarTab={this.buttonEditarTab}
          handleChangeExpense={this.handleChangeExpense}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  // editExpense: state.wallet.editExpense,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProps: (expense) => dispatch(fetchCurrencyAction(expense)),
  deleteExpenseProps: (id) => dispatch(deleteExpense(id)),
  editExpenseProps: (id) => dispatch(editExpenses(id)),
  editing: (change) => dispatch(thisEditing(change)),
  addChangeEditDispatch:
  (expensesToSendEdit) => dispatch(addEdicao(expensesToSendEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseProps: PropTypes.func.isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
  editExpenseProps: PropTypes.func.isRequired,
};
