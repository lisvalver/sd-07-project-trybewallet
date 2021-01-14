import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.reduceExchange = this.reduceExchange.bind(this);
    this.expensesTable = this.expensesTable.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { thunkApi } = this.props;
    thunkApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  reduceExchange(expense) {
    return expense.reduce((acc, vt) => acc
      + parseFloat(vt.value)
      * parseFloat(vt.exchangeRates[vt.currency].ask), 0).toFixed(2);
  }

  expensesTable(expenses) {
    const { description, tag, method, value, exchangeRates, currency } = expenses;
    return (
      <tr key={ description }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>
          {((value) * (exchangeRates[currency].ask)).toFixed(2) }
        </td>
        <td>Real</td>
      </tr>
    );
  }

  render() {
    const { email, addExpenses, currencies, thunkApi, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <p>Trybe Wallet</p>
        <header>
          <h3 data-testid="email-field">{ email }</h3>

          <spam data-testid="total-field">{ this.reduceExchange(expenses) }</spam>

          <h4 data-testid="header-currency-field">BRL</h4>
        </header>

        <form>
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
          >
            <option hidden>
              moeda
            </option>
            {currencies.map((item) => (
              <option
                key={ item }
                data-testid={ item }
              >
                { item }
              </option>
            ))}
          </select>
          <select
            name="method"
            onChange={ this.handleChange }
            value={ method }
            data-testid="method-input"
          >
            <option
              data-testid="dinheiro"
            >
              Dinheiro
            </option>
            <option
              data-testid="credito"
            >
              Cartão de crédito
            </option>
            <option
              data-testid="debito"
            >
              Cartão de débito
            </option>
          </select>
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
          >
            <option
              data-testid="alimentação"
            >
              Alimentação
            </option>
            <option
              data-testid="lazer"
            >
              Lazer
            </option>
            <option
              data-testid="trabalho"
            >
              Trabalho
            </option>
            <option
              data-testid="transporte"
            >
              Transporte
            </option>
            <option
              data-testid="saude"
            >
              Saúde
            </option>
          </select>
          <button
            type="button"
            onClick={ () => {
              thunkApi();
              addExpenses(this.state);
            } }
          >
            Adicionar despesa
          </button>
        </form>

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
            {expenses.map((expense) => this.expensesTable(expense))}
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  addExpenses: actions.addExpenses,
  thunkApi: actions.thunkApi,
};

Wallet.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
  email: PropTypes.func.isRequired,
  thunkApi: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
