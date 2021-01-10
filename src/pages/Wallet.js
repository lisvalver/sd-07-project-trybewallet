import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {

  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
    console.log(this.props);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((previouState) => ({
      form: { ...previouState, [name]: value },
    }));
  }

  render() {
    const currency = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
      'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

    return (
      <div>
        <header data-testid="email-field">
          { this.props.state.user.email }
        </header>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
        <input
          name="value"
          placeholder="valor da despesa"
          type="number"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          placeholder="descrição da despesa"
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
          >
            {currency.map((element, key) => (
              (element !== 'USDT') && (
                <option
                  key={ key }
                  value={ element }
                  data-testid={ element }
                >
                  {element}
                </option>)
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="despesa">
          <select
            data-testid="tag-input"
            id="despesa"
            name="despesa"
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
          data-testid="total-field"
          onClick={ () => { addExpense(); } }
        >
          Adicionar Despesas
        </button>

      </div>
    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToPros)(Wallet);
