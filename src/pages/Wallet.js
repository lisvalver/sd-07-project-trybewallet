// Esse projeto teve a ajuda e orientação do aluno Tiago Esdras

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import ExpensesForm from '../Components/FormExpenses';
import fetchCurrency from '../APIs';
import { fetchCurrencyAction, deleteExpense, editExpense } from '../actions';
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
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { addExpenseProps } = this.props;
    addExpenseProps(expense)
      .then(() => this.calcExpenses())
      .then(() => this.eraseState());
  }

  render() {
    const { user, expenses, deleteExpenseProps, editExpenseProps } = this.props;
    // console.log(this.props);
    const { arrayCurrencyFiltered, totalExpenses } = this.state;
    return (
      <div>
        <Header
          user={ user }
          totalExpenses={ totalExpenses }
        />
        <ExpensesForm
          state={ this.state }
          arrayCurrencyFiltered={ arrayCurrencyFiltered }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
        />
        <Table
          expenses={ expenses }
          deleteExpenseProps={ deleteExpenseProps }
          editExpenseProps={ editExpenseProps }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProps: (expense) => dispatch(fetchCurrencyAction(expense)),
  deleteExpenseProps: (id) => dispatch(deleteExpense(id)),
  editExpenseProps: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseProps: PropTypes.func.isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
  editExpenseProps: PropTypes.func.isRequired,
};
