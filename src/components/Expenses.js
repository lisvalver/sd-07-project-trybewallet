import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, fetchExchange, deleteExpense, editExpense } from '../actions';
import fetchCurrencyApi from '../services/currenciesAPI';
import './Expenses.css';

class Expenses extends React.Component {
  constructor() {
    super();

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.setInputState = this.setInputState.bind(this);
    this.sendExpense = this.sendExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currentEdit: 0,
      currentExchenges: '',
      editDisplay: 'none',
      addDisplay: 'block',
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  setInputState({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async fetchCurrencies() {
    const { fetchCurrencies } = this.props;

    try {
      const currencies = await fetchCurrencyApi();
      fetchCurrencies(
        Object.entries(currencies)
          .filter((currency) => currency[0] !== 'USDT')
          .map((currency) => currency[1]),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendExpense(event) {
    event.preventDefault();

    const { getExchange, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    getExchange({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    });

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  deleteExpense({ target: { id } }) {
    const { removeExpense } = this.props;

    removeExpense(id);
  }

  editExpense({ target: { id } }) {
    const { expenses } = this.props;
    const currentEdit = expenses.find((expense) => expense.id === +id);

    this.setState({
      currentEdit: id,
      value: currentEdit.value,
      description: currentEdit.description,
      currency: currentEdit.currency,
      method: currentEdit.method,
      tag: currentEdit.tag,
      currentExchenges: currentEdit.exchangeRates,
      editDisplay: 'block',
      addDisplay: 'none',
    });
  }

  confirmEdit() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      currentEdit,
      currentExchenges,
    } = this.state;
    const { sendExpense } = this.props;

    sendExpense({
      id: +currentEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currentExchenges,
    });

    this.setState({
      editDisplay: 'none',
      addDisplay: 'block',
    });
  }

  render() {
    const { currencies, expenses } = this.props;
    const {
      value,
      editDisplay,
      addDisplay,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <form className="expenses-form">
          <label htmlFor="value-input">
            Valor da despesa
            <input
              onChange={ this.setInputState }
              name="value"
              id="value-input"
              data-testid="value-input"
              type="number"
              value={ value }
              className="expenses-input value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição da despesa:
            <input
              onChange={ this.setInputState }
              name="description"
              id="description-input"
              data-testid="description-input"
              type="text"
              value={ description }
              className="expenses-input description-input"
            />
          </label>
          <label htmlFor="description-input">
            Moeda:
            <select
              id="select"
              onChange={ this.setInputState }
              name="currency"
              data-testid="currency-input"
              value={ currency }
              className="expenses-input select-dropdown"
            >
              {currencies.map((curr) => (
                <option
                  key={ curr.code }
                  data-testid={ curr.code }
                  className="expenses-options"
                >
                  { curr.code }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              onChange={ this.setInputState }
              name="method"
              data-testid="method-input"
              value={ method }
              className="expenses-input select-dropdown"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              onChange={ this.setInputState }
              name="tag"
              data-testid="tag-input"
              value={ tag }
              className="expenses-input select-dropdown"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            style={ { display: addDisplay } }
            onClick={ this.sendExpense }
            className="expenses-button"
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            style={ { display: editDisplay } }
            onClick={ this.confirmEdit }
          >
            Editar despesa
          </button>
        </form>
        <table className="table">
          <thead>
            <tr className="table-rows table-header">
              <th className="column description">Descrição</th>
              <th className="column others">Tag</th>
              <th className="column payment">Método de pagamento</th>
              <th className="column others">Valor</th>
              <th className="column others">Moeda</th>
              <th className="column others">Câmbio utilizado</th>
              <th className="column others">Valor convertido</th>
              <th className="column others">Moeda de conversão</th>
              <th className="column others">Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses ? expenses.map((expense, index) => (
              <tbody key={ index }>
                <tr className="table-rows">
                  <td
                    className="column description"
                  >
                    { expense.description }
                  </td>
                  <td
                    className="column others"
                  >
                    { expense.tag }
                  </td>
                  <td
                    className="column payment"
                  >
                    { expense.method }
                  </td>
                  <td
                    className="column others"
                  >
                    { expense.value }
                  </td>
                  <td
                    className="column others"
                  >
                    { expense.exchangeRates[expense.currency].name }
                  </td>
                  <td
                    className="column others"
                  >
                    { (+expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td
                    className="column others"
                  >
                    {
                      (expense.value * expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td
                    className="column others"
                  >
                    Real
                  </td>
                  <td
                    className="column others"
                  >
                    <button
                      id={ expense.id }
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.editExpense }
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteExpense }
                    >
                      excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            )) : ''
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  getExchange: (currencies) => dispatch(fetchExchange(currencies)),
  fetchCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
  removeExpense: (id) => dispatch(deleteExpense(id)),
  sendExpense: (expense) => dispatch(editExpense(expense)),
});

Expenses.propTypes = {
  getExchange: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
