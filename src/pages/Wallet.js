import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencyV3 } from '../services/currencyAPI.js';
import { expensesWithExchangeRates } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyData: [],
      expenses: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    getCurrencyV3()
      .then((data) => this.setState({ currencyData: Object.entries(data) }));
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
              Despesa Total: R$ 0,00
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
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="textarea"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.inputOnChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.inputOnChange }
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
            >
              <option value="money">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.inputOnChange }
            >
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="Transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => combineExpenses(expenses) }
            style={ { background: 'rgb(235, 212, 12, 0.5)' } }
          >
            Entrar
          </button>
        </form>
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
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
