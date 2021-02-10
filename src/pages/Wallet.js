import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../services/currencyAPI';
import { expensesWithExchangeRates } from '../actions';
import SpendTable from '../components/SpendTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyData: [],
      expenses: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    getCurrency()
      .then((data) => this.setState({ currencyData: Object.entries(data) }));
  }

  totalFieldCalculation() {
    const { state: { wallet: { expenses } } } = this.props;
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        const { currency, value, exchangeRates: { [currency]: { ask } } } = expense;
        total += (ask * value);
        // const total = Math.round(((ask * value) + Number.EPSILON) * 100) / 100; i dont know...
      });
    }
    return total.toFixed(2);
  }

  updateState() {
    this.setState((prevState) => ({
      expenses: { id: prevState.expenses.id + 1, value: 0 },
    }));
  }

  inputOnChange({ target: { name, value } }) {
    const { expenses } = this.state;
    this.setState({ expenses: { ...expenses, [name]: value } });
  }

  render() {
    const { currencyData, expenses } = this.state;
    const { state: { user: { email } }, combineExpenses } = this.props;
    return (
      <div>
        <div className="top-bar">
          <h1>Wallet</h1>
          <div className="top-bar-info">
            <p data-testid="email-field">
              Email:
              {' '}
              {email}
            </p>
            <p
              data-testid="total-field"
            >
              Despesa Total: R$
              {' '}
              { this.totalFieldCalculation() }
              {' '}
              <span
                data-testid="header-currency-field"
              >
                BRL
              </span>
            </p>
          </div>
        </div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ this.inputOnChange }
              value={ expenses.value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.inputOnChange }
              value={ expenses.description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.inputOnChange }
              value={ expenses.currency }
            >
              {currencyData.map((currency) => {
                if (currency[0] !== 'USDT') {
                  return (
                    <option
                      key={ currency[0] }
                      data-testid={ currency[0] }
                      value={ currency[0] }
                    >
                      { currency[0] }
                    </option>
                  );
                }
                return '';
              })}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.inputOnChange }
              value={ expenses.method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.inputOnChange }
              value={ expenses.tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ async () => {
              await combineExpenses(expenses);
              this.updateState();
            } }
          >
            Adicionar despesa
          </button>
        </form>
        <SpendTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  combineExpenses: (expensesData) => dispatch(expensesWithExchangeRates(expensesData)),
});

Wallet.propTypes = {
  combineExpenses: PropTypes.func.isRequired,
  state: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    wallet: PropTypes.shape({
      expenses: PropTypes.instanceOf(Array).isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
