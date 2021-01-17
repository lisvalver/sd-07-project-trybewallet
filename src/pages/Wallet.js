import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addExpenses, fetchCurrence } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      form: {
        value: 0,
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
        id: 0,
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrence } = this.props;
    getCurrence();
  }

  async handleClick() {
    const { getCurrence, addXablau, currencies } = this.props;
    const { total } = this.state;
    console.log(currencies);
    await getCurrence();
    this.setState((previousState) => ({
      ...previousState,
      form: { ...previousState, exchangeRates: currencies },
    }));
    console.log(currencies);
    addXablau(this.state.form);
    const { form } = this.state;
    console.log(this.state);
    const valueConverted = form.value * currencies[form.currency].ask;
    const acum = parseFloat(total) + parseFloat(valueConverted);
    await this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        value: valueConverted,
        exchangeRates: currencies,
      },
      total: acum,
    }));

    this.setState((previouState) => ({
      ...previouState,
      form: {
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        id: previouState.form.id + 1,
        description: '',
        value: 0,
      },
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((previousState) => ({
      ...previousState,
      form: {
        ...previousState.form,
        [name]: value,
      },
    }));
  }


  render() {
    const { email } = this.props;
    const { total, form } = this.state;
    //console.log(this.props);
    const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        Trybe Wallet
        <Link to="/">
          <button type="button"> Voltar </button>
        </Link>

        <form>
          <input
            type="text"
            placeholder="Valor da despesa"
            data-testid="value-input"
            name="value"
            value={ form.value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            name="description"
            value={ form.description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {moedas.map((element, key) => ((element !== 'USDT') && (
                <option
                  key={ key }
                  value={ element }
                  data-testid={ element }
                >
                  { element }
                </option>
              )))}

            </select>
          </label>
          <label htmlFor="method">
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick= { this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrence: () => dispatch(fetchCurrence()),
  addXablau: (expenses) => dispatch(addExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
