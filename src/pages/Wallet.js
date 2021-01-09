import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../helpers';
import { fetchCurrencyAction } from '../actions';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencyType = this.fetchCurrencyType.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);

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
  }

  componentDidMount() {
    this.fetchCurrencyType();
  }

  handlerChange({ target }) {
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
  }

  sumExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);
    this.setState({
      totalExpenses,
    });
  }

  clearAll() {
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

  handlerSubmit(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { addExpenseProps } = this.props;
    addExpenseProps(expense)
      .then(() => this.sumExpenses())
      .then(() => this.clearAll());
  }

  render() {
    const { user } = this.props;
    const { arrayCurrencyFiltered, totalExpenses } = this.state;
    return (
      <div>
        <Header user={ user } totalExpenses={ totalExpenses } />
        <ExpensesForm
          state={ this.state }
          arrayCurrencyFiltered={ arrayCurrencyFiltered }
          handlerChange={ this.handlerChange }
          handlerSubmit={ this.handlerSubmit }
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
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
