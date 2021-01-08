import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpenses,
  failedRequest,
  request,
  fetchCurrency,
  addTotal,
} from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(null, false);
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  saveExpense() {
    // this.fetchApi();
    const { fetchData } = this.props;
    fetchData(this.state, true);
    // this.currencyValue();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      email,
      mapCurrency = [],
      totalValue = 0,
      expenses,
    } = this.props;
    console.log(expenses);
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        TrybeWallet
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{totalValue}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <label htmlFor="valor-despesa">
          Valor despesa:
          <input
            data-testid="value-input"
            type="number"
            onChange={ (e) => this.handleChanger(e) }
            id="value"
            name="value"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            onChange={ (e) => this.handleChanger(e) }
            id="description"
            name="description"
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Tipo da moeda:
          <select
            data-testid="currency-input"
            onChange={ (e) => this.handleChanger(e) }
            name="currency"
            id="currency"
            value={ currency }
          >
            {mapCurrency.map(
              (item, index) => !(item === 'USDT') && (
                <option key={ index } data-testid={ item } value={ item }>
                  {item}
                </option>
              ),
            )}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            onChange={ (e) => this.handleChanger(e) }
            name="method"
            id="method"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Despesas:
          <select
            data-testid="tag-input"
            onChange={ (e) => this.handleChanger(e) }
            name="tag"
            id="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <input type="button" value="Adicionar despesa" onClick={ this.saveExpense } />
        </label>
        <div>
          <table>
            <thead>
              <tr>
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
              {expenses.map((item) => (
                <tr key={ item.id }>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    {item.tag}
                  </td>
                  <td>
                    {item.method}
                  </td>
                  <td>
                    {item.value}
                  </td>
                  <td>
                    {item.exchangeRates[item.currency].name}
                  </td>
                  <td>
                    {Number(item.exchangeRates[item.currency].ask
                  * Number(item.value)).toFixed(2)}
                  </td>
                  <td>
                    {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    Real
                  </td>
                  <button data-testid="delete-btn" type="button">Deletar</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expenses) => dispatch(addExpenses(expenses)),
  failed: (error) => dispatch(failedRequest(error)),
  requiseted: () => dispatch(request()),
  fetchData: (a, b) => dispatch(fetchCurrency(a, b)),
  toTotal: (value) => dispatch(addTotal(value)),
});
// addExpense é a props addExpenses é importação da action

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  mapCurrency: state.wallet.currency,
  totalValue: state.wallet.totalValue,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  mapCurrency: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchData: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
