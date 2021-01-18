import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currencyAPI from '../actions/currenceAPI';
import { addExpense } from '../actions/wallet.action';

class WalletFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: {
        method: 'Dinheiro',
        tag: 'Lazer',
        desciption: '',
        currency: 'USD',
        Value: 0,
        exchangeRates: {},
      },
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // componentDidMount() { this.handleFetch(); }

  async handleFetch() {
    const { apiFetch } = this.props;
    const { expenses } = this.state;
    const exchangeRates = await apiFetch();
    this.setState({
      expenses: { ...expenses, exchangeRates },
    });
  }

  async handleChange(event) {
    event.preventDefalt();
    const { addExp } = this.props;
    const { handleFetch } = this;
    await handleFetch();
    const { expenses } = this.state;
    addExp(expenses);
    this.setState({
      expenses: {
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        currency: 'USD',
        value: 0,
        exchangeRates: { ...expenses.exchangeRates },
      } });
  }

  handleInput(event) {
    const { target: { name, value } } = event;
    this.setState((state) => ({ ...state,
      expenses: {
        ...state.expenses, [name]: value,
      },
    }));
  }

  render() {
    const { currencies } = this.props;
    console.log(this.state);
    const { expenses } = this.state;
    const { value, method, description, tag, currency } = expenses;
    const filterCurrency = Object.keys(currencies).filter((acc) => acc !== 'USDT');
    return (
      <div className="container-function">
        <form onSubmit={ this.handleChange }>
          <label htmlFor="valor">
            Valor:
            <input
              type="text"
              id="valor"
              className="input-function"
              data-testid="value-input"
              onChange={ this.handleInput }
              value={ value }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
              onChange={ this.handleInput }
              value={ description }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInput }
            >
              {filterCurrency.map((curr) => (
                <option
                  value={ curr }
                  key={ curr }
                  data-testid={ curr }
                >
                  {curr}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Metodo de pagamento:
            <select
              id="moeda"
              data-testid="method-input"
              onChange={ this.handleInput }
              value={ method }
            >
              <option value="null">  </option>
              <option value="money"> Dinheiro </option>
              <option value="credit-card"> Cartão de crédito </option>
              <option value="debit-card">Cartão de débito</option>

            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="null"> </option>
              <option value="alimentação"> Alimentação </option>
              <option value="lazer"> Lazer </option>
              <option value="trabalho"> Trabalho </option>
              <option value="transporte"> Transporte </option>
              <option value="saúde"> Saúde </option>
            </select>
          </label>
          <button className="btn-wallet" type="submit">
            Adcionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(currencyAPI()),
  addExp: (expenses) => dispatch(addExpense(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletFunction.propTypes = {
  currencies: PropTypes.objectOf.isRequired,
  apiFetch: PropTypes.func.isRequired,
  addExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletFunction);
