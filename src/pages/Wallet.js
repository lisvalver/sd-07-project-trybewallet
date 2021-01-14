import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseAct, editExpenseAct, fetchCurrencies } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateState = this.updateState.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.sendExpense = this.sendExpense.bind(this);
  }

  componentDidMount() {
    const { findCurrencies } = this.props;
    findCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  updateState() {
    const { addExpense, findCurrencies, currencies } = this.props;
    findCurrencies();
    this.setState(() => (
      {
        exchangeRates: currencies,
      }), () => {
      addExpense(this.state);
      this.setState((currentState) => (
        {
          id: currentState.id + 1,
        }));
    });
  }

  editExpense() {
    const { expenses, expenseId, currencies, updateExpense } = this.props;
    const { value, currency, method, tag, description } = this.state;
    expenses[expenseId].value = value;
    expenses[expenseId].currency = currency;
    expenses[expenseId].method = method;
    expenses[expenseId].tag = tag;
    expenses[expenseId].description = description;
    expenses[expenseId].exchangeRates = currencies;
    updateExpense(expenses[expenseId]);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const { currency, exchangeRates, value } = expense;
      return acc + parseFloat(exchangeRates[currency].ask * value);
    }, 0);
    return total.toFixed(2);
  }

  sendExpense() {
    this.updateState();
    this.totalExpenses();
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { user, currencies, editingExpense } = this.props;

    const addButton = (
      <button type="button" onClick={ this.sendExpense }>
        Adicionar despesa
      </button>
    );

    const editButton = (
      <button type="button" onClick={ this.editExpense }>
        Editar despesa
      </button>
    );

    const totalSpend = this.totalExpenses();

    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <div data-testid="email-field">
            <p>Usuário: </p>
            <p>{ user }</p>
          </div>
          <div data-testid="total-field">
            <p>Despesas totais: </p>
            <p>{ totalSpend }</p>
          </div>
          <div data-testid="header-currency-field">
            <p>Câmbio: BRL</p>
          </div>
        </header>

        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { Object.keys(currencies)
                .filter((code) => code !== 'USDT')
                .map((code) => (
                  <option
                    key={ code }
                    data-testid={ code }
                    value={ code }
                  >
                    { code }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Saúde">Saúde</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          { editingExpense ? editButton : addButton }
        </form>

        <Table />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editingExpense: state.wallet.editingExpense,
  expenseId: state.wallet.expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  findCurrencies: (currencies) => dispatch(fetchCurrencies(currencies)),
  addExpense: (expense) => dispatch(addExpenseAct(expense)),
  updateExpense: (expense) => dispatch(editExpenseAct(expense, false)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenseId: PropTypes.number.isRequired,
  editingExpense: PropTypes.bool.isRequired,
  findCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
