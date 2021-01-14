import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './Table';
import { editedExpense, getCurrencies, newExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      editingHandled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  componentDidUpdate() {
    const { editingExpense } = this.props;
    const { editingHandled } = this.state;
    if (editingExpense && !editingHandled) {
      this.handleEditEnter();
    }
  }

  handleEditEnter() {
    const { selectedExpense, expenses } = this.props;
    const values = expenses.find((e) => e.id === selectedExpense);
    this.setState({
      ...values, editingHandled: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { addExpense, updateCurrencies, currencyRates } = this.props;
    await updateCurrencies();
    await this.setState({ exchangeRates: currencyRates });
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const editedObject = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates };
    await addExpense(editedObject);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      editingHandled: 'false',
    });
  }

  handleEdit() {
    const { changeExpense, selectedExpense, idSelected } = this.props;
    const { value, description, currency, method, tag } = this.state;
    this.setState({
      editingHandled: false,
    });
    const editedObject = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: selectedExpense.exchangeRates,
      id: idSelected,
    };
    console.log(selectedExpense.id);
    changeExpense(editedObject);
  }

  render() {
    const { login, currencies, expenses, editingExpense } = this.props;
    const { value, description, method, currency, tag } = this.state;
    let editingOrAdding = (
      <button
        onClick={ () => this.handleClick() }
        type="button"
      >
        Adicionar despesa
      </button>);
    let arr = ['BRL', 'USD'];
    if (currencies.wallet !== undefined) {
      arr = currencies.wallet.currencies.filter((cur) => cur !== 'USDT');
    }
    let total = 0;
    if (expenses.length > 0) {
      total = expenses
        .map((e) => e.value * e.exchangeRates[e.currency].ask)
        .reduce((acc, cur) => acc + cur);
    }
    if (editingExpense) {
      editingOrAdding = (
        <button
          onClick={ () => this.handleEdit() }
          type="button"
        >
          Editar despesa
        </button>);
    }
    return (
      <div>
        <div className="App-header">
          <h1 data-testid="email-field">
            Email:
            {login}
          </h1>
          <h1 data-testid="total-field">{total}</h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </div>
        <div>
          <input
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
          <input
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
          <select
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {arr.map((cur) => (
              <option data-testid={ cur } key={ cur } value={ cur }>
                {cur}
              </option>
            ))}
          </select>
          <select
            value={ method }
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {editingOrAdding}
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  currencies: state.wallet,
  expenses: state.wallet.expenses,
  currencyRates: state.wallet.apiData,
  editingExpense: state.wallet.editingExpense,
  selectedExpense: state.wallet.selectedExpense,
  idSelected: state.wallet.selctedId,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
  addExpense: (data) => dispatch(newExpense(data)),
  changeExpense: (data) => dispatch(editedExpense(data)),
});

Wallet.propTypes = {
  login: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf().isRequired,
  updateCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencyRates: PropTypes.objectOf().isRequired,
  addExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.func.isRequired,
  selectedExpense: PropTypes.objectOf.isRequired,
  changeExpense: PropTypes.func.isRequired,
  idSelected: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
