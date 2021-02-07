import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  addExpenses,
  deleteExpenses,
  editExpenses,
} from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 10,
      description: 'inicial',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
      api: {},
      parcial: 0,
    };

    this.addExpense = this.addExpense.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editExpense = this.editExpense.bind(this);

    // this.api = this.api.bind(this);
  }

  componentDidMount() {
    this.props.fetchAPI();
    // idiotice né ... refatorar
    // this.api();
  }

  async addExpense() {
    // const storeState = this.props.storeState;

    const { storeState, addExpenses } = this.props;
    const expenseResponse = await fetch(
      'https://economia.awesomeapi.com.br/json/all'
    );
    const expenseJSON = await expenseResponse.json();
    delete expenseJSON.USDT;
    this.setState(
      {
        api: expenseJSON,
      },
      () => {
        // console.log('id newstate', newState);
        const {
          id,
          value,
          description,
          currency,
          method,
          tag,
          api,
        } = this.state;
        const parcial = parseFloat(value) * parseFloat(api[currency].ask);
        // console.log(parcial);
        // console.log("api", api);

        const expense = {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: api,
        };
        // console.log("expense", expense);
        addExpenses(expense, parcial);
        // console.log('store', storeState);

        this.setState({
          id: id + 1,
          exchangeRates: api,
          parcial,
        });
      }
    );
  }

  editExpense() {

    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const editedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRates,
    };
    this.props.editExpenses(editedExpense)
    console.log('editExpense');
  }

  handleDelete(id) {
    console.log('delete', id);
    this.props.deleteExpenses(id);
  }

  handleEdit(id) {
    console.log('edit');
    const { storeState } = this.props;
    this.setState(
      {
        id: id,
        value: storeState[id].value,
        description: storeState[id].description,
        currency: storeState[id].currency,
        method: storeState[id].method,
        tag: storeState[id].tag,
        exchangeRates: storeState[id].exchangeRates
      })
    console.log('edit', storeState);


  }

  render() {
    const { userEmail, APIoptions, totalExpenses, storeState } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // const roundedExpenses = parseFloat(totalExpenses).toFixed(2);
    const roundedExpenses = totalExpenses;

    return (
      <div>
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">{totalExpenses || 0}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valueInput">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="valueInput"
              id="valueInput"
              value={value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </label>
          <label htmlFor="descriptionInput">
            Despesa
            <input
              data-testid="description-input"
              type="text"
              name="descriptionInput"
              id="descriptionInput"
              value={description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </label>
          <label htmlFor="currency">
            Moeda$
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={currency}
              onChange={(event) =>
                this.setState({ currency: event.target.value })
              }>
              {APIoptions.map((options) => (
                <option
                  value={options}
                  key={options}
                  data-testid={`${options}`}>
                  {options}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={method}
              onChange={(event) =>
                this.setState({ method: event.target.value })
              }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria da despesa:
            <select
              id="category"
              name="category"
              data-testid="tag-input"
              value={tag}
              onChange={(event) => this.setState({ tag: event.target.value })}>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={this.addExpense}>
            Adicionar despesa
          </button>
          <button type="button" onClick={this.editExpense}
          >Editar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {storeState.map((expenseLine) => (
              <tr key={expenseLine.id}>
                <td>{expenseLine.id}</td>
                <td>{expenseLine.description}</td>
                <td>{expenseLine.tag}</td>
                <td>{expenseLine.method}</td>
                <td>{expenseLine.value}</td>
                <td>{expenseLine.exchangeRates[expenseLine.currency] ? expenseLine.exchangeRates[expenseLine.currency].name : null}</td>
                <td>
                  {expenseLine.exchangeRates[expenseLine.currency] ?
                  parseFloat(
                    expenseLine.exchangeRates[expenseLine.currency].ask
                  ).toFixed(2) : null }
                </td>
                <td>
                  { expenseLine.exchangeRates[expenseLine.currency] ?
                  parseFloat(
                    expenseLine.value *
                      expenseLine.exchangeRates[expenseLine.currency].ask
                  ).toFixed(2) : null }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={() => {
                      this.handleDelete(expenseLine.id);
                    }}>
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={() => {
                      this.handleEdit(expenseLine.id);
                    }}>
                    Editar
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

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  APIoptions: state.wallet.currencies,
  totalExpenses: state.wallet.total,
  storeState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchCurrencies()),
  addExpenses: (expense, parcial) => dispatch(addExpenses(expense, parcial)),
  deleteExpenses: (id) => dispatch(deleteExpenses(id)),
  editExpenses: (editedExpense) => dispatch(editExpenses(editedExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
