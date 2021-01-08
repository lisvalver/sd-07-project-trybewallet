import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense } from '../actions';
import CurrencyOption from '../components/CurrencyOption';
import TableItem from '../components/TableItem';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  getCurrency() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => this.setState({ currencies: Object.keys(data).filter(
        (currency) => currency !== 'USDT',
      ) }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpense() {
    const { id, value, description, currency, method, tag } = this.state;
    const { add } = this.props;
    this.setState({ id: id + 1 });
    add({ id, value, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  totalExpenses(props) {
    const { expenses } = props.store.wallet;
    let totalExpenses = 0;
    expenses.map((expense) => {
      const { currency, exchangeRates, value } = expense;
      const myCurrency = exchangeRates[`${currency}`];
      totalExpenses += parseFloat(
        (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2),
      );
      return totalExpenses;
    });
    return totalExpenses;
  }

  renderTable(props) {
    const { expenses } = props.store.wallet;
    if (expenses.length > 0) {
      return expenses.map((expense) => (
        <TableItem
          key={ expense.id }
          expense={ expense }
        />
      ));
    }
  }

  render() {
    const { store } = this.props;
    const { user } = store;
    const { email } = user;
    const { value, description, currency, method, tag, currencies } = this.state;
    return (
      <div>
        <header>
          <div className="email-container">
            <div data-testid="email-field">{ email }</div>
          </div>
          <div className="total-expenses-container">
            <div data-testid="total-field">{ this.totalExpenses(this.props) }</div>
          </div>
          <div className="currency-container">
            <div data-testid="header-currency-field">BRL</div>
          </div>
        </header>
        <div className="Form">
          <fieldset>
            <div className="expense-container">
              <div className="value">
                <label htmlFor="value">
                  Valor:
                  <input
                    name="value"
                    type="number"
                    step="0.01"
                    value={ value }
                    data-testid="value-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="description">
                <label htmlFor="description">
                  Descrição:
                  <input
                    name="description"
                    type="text"
                    value={ description }
                    data-testid="description-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="currency">
                Moeda:
                <select
                  name="currency"
                  value={ currency }
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                >
                  { currencies.map((currencyCode) => (
                    <CurrencyOption
                      key={ currencyCode }
                      currency={ currencyCode }
                    />))}
                </select>
              </div>
              <div className="payment-method">
                Método de pagamento:
                <select
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </div>
              <div className="tag">
                Tag:
                <select
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </div>
            </div>
          </fieldset>
          <div className="add-expense-button">
            <button
              type="button"
              onClick={ this.saveExpense }
            >
              Adicionar despesa
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <tbody>
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
              { this.renderTable(this.props) }
            </tbody>
          </table>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapDispatchToProps = (dispatch) => ({
  add: (object) => dispatch(addExpense(object)) });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  add: propTypes.func.isRequired,
  store: propTypes.shape({
    wallet: propTypes.shape({
      expenses: propTypes.arrayOf(propTypes.object),
    }),
    user: propTypes.shape({
      email: propTypes.string,
    }),
  }),
}.isRequired;
