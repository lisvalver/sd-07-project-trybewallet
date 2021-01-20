import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingDespesa,
  fetchingCurrencies,
  deleteThis,
  addTotal,
  thisEditing,
  addEdicao,
} from '../actions/index';

class Despesas extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonDeleteItem = this.buttonDeleteItem.bind(this);
    this.buttonEditarTab = this.buttonEditarTab.bind(this);
    this.handleChangeExpense = this.handleChangeExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
    console.log(fetchCurrencies);
  }

  handleInput({ target: { name, value } }) {
    const { expenses } = this.state;
    this.setState({
      expenses: {
        ...expenses,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendExpenseApi } = this.props;
    const { expenses: expensesToSend } = this.state;
    sendExpenseApi(expensesToSend);
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

  upDateTotal(expense) {
    addTotal(expense);
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

  buttonDeleteItem(id) {
    const { deleteItemExpenses } = this.props;
    deleteItemExpenses(id);
  }

  render() {
    const { expenses: { value,
      description,
      currency,
      method,
      tag,
    },
    } = this.state;

    const { currencies, expenses, isEditing } = this.props;
    return (
      <div>
        <form className="despesas">
          <div className="container">
            <div className="input">
              <label htmlFor="expense-value">
                Valor da despesa:
                <input
                  id="expense-value"
                  name="value"
                  type="number"
                  data-testid="value-input"
                  value={ value }
                  onChange={ this.handleInput }
                />
              </label>
            </div>
            <div className="input">
              <label htmlFor="description">
                Descrição:
                <input
                  id="description"
                  name="description"
                  data-testid="description-input"
                  value={ description }
                  onChange={ this.handleInput }
                />
              </label>
            </div>
            <div className="input">
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ this.handleInput }
                >
                  {currencies.map((cur) => (
                    <option
                      value={ cur }
                      data-testid={ cur }
                      key={ cur }
                    >
                      { cur }
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="input">
              <label htmlFor="method">
                Forma de Pagamento:
                <select
                  id="method"
                  name="method"
                  data-testid="method-input"
                  value={ method }
                  onChange={ this.handleInput }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
            </div>
            <div className="input">
              <label htmlFor="tag">
                Tipo:
                <select
                  id="tag"
                  name="tag"
                  data-testid="tag-input"
                  value={ tag }
                  onChange={ this.handleInput }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
            </div>
            { (!isEditing)
              ? (
                <button
                  type="button"
                  onClick={ this.handleSubmit }
                >
                  Adicionar despesa
                </button>)
              : (
                <button
                  type="button"
                  onClick={ this.handleChangeExpense }
                >
                  Editar Despesa
                </button>
              ) }
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={ exp }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{exp.value}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td
                  id="coin"
                >
                  {parseFloat(exp.exchangeRates[exp.currency].ask * exp.value)
                    .toFixed(2)}
                </td>
                <td>
                  {parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => {
                      this.buttonEditarTab(exp);
                      this.upDateTotal(exp);
                    } }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => {
                      this.buttonDeleteItem(exp.id);
                      this.upDateTotal(exp);
                    } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Despesas.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  currencies: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  sendExpenseApi: PropTypes.func.isRequired,
  deleteItemExpenses: PropTypes.arrayOf.isRequired,
  isEditing: PropTypes.number.isRequired,
  editing: PropTypes.func.isRequired,
  addChangeEditDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchingCurrencies()),
  sendExpenseApi: (expenses) => dispatch(fetchingDespesa(expenses)),
  deleteItemExpenses: (id) => dispatch(deleteThis(id)),
  upDateTotal: () => dispatch(addTotal()),
  editing: (change) => dispatch(thisEditing(change)),
  addChangeEditDispatch:
  (expensesToSendEdit) => dispatch(addEdicao(expensesToSendEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
