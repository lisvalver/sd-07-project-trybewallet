import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencyExchange, addExpense } from '../actions';
import Header from '../components/Header';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.filterCurrenciesInitials = this.filterCurrenciesInitials.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      expense: {
        description: '',
        value: 0,
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    const { requestCoins } = this.props;
    requestCoins();
  }

  handleSubmit() {
    const { expense } = this.state;
    addExpense(expense);
    this.resetState();
  }

  filterCurrenciesInitials() {
    const { currencies } = this.props;
    const keysCurrencies = Object.keys(currencies).filter(
      (currency) => currency !== 'USDT',
    );

    return keysCurrencies.map((coin) => (
      <option key={ coin } data-testid={ coin }>
        { coin }
      </option>
    ));
  }

  eventHandler({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        ...prevState.expense,
        [name]: value,
      },
    }));
  }

  resetState() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        ...prevState.expense,
        description: '',
        value: 0,
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    }));
  }

  render() {
    const { email, total, expenses } = this.props;
    const { expense } = this.state;
    const { description, value, currency, method, tag } = expense;
    return (
      <div>
        <Header email={ email } total={ total } />
        <Form
          currencies={ this.filterCurrenciesInitials }
          setState={ this.eventHandler }
          onSubmit={ this.handleSubmit }
          description={ description }
          value={ value }
          currency={ currency }
          method={ method }
          tag={ tag }
        />
        <ExpensesTable expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { email },
  wallet: { currencies, expenses, total },
}) => ({
  email,
  currencies,
  expenses,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoins: () => dispatch(saveCurrencyExchange()),
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number.isRequired,
  requestCoins: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
