import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, newExpense } from '../actions';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { addExpense, updateCurrencies, currencyRates } = this.props;
    await updateCurrencies();
    await this.setState({ exchangeRates: currencyRates });
    await addExpense(this.state);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { login, currencies, expenses } = this.props;
    const { value } = this.state;
    let arr = ['BRL', 'USD'];
    if (currencies.wallet !== undefined) {
      arr = currencies.wallet.currencies.filter((currency) => currency !== 'USDT');
    }
    let total = 0;
    if (expenses.length > 0) {
      total = expenses
        .map((e) => e.value * e.exchangeRates[e.currency].ask)
        .reduce((acc, cur) => acc + cur);
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
            onChange={ this.handleChange }
            data-testid="description-input"
          />
          <select
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {arr.map((currency) => (
              <option data-testid={ currency } key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
          <select
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
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
          <button onClick={ () => this.handleClick() } type="button">
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  currencies: state.wallet,
  expenses: state.wallet.expenses,
  currencyRates: state.wallet.apiData,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
  addExpense: (data) => dispatch(newExpense(data)),
});

Wallet.propTypes = {
  login: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencyRates: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
