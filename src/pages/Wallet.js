import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, add } from '../actions';

class Wallet extends React.Component {

  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      form: {
        id: 0,
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.addExpense = this.addExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        [name]: value,
      },
    }));
  }

  async addExpense() {
    const { addExpenses, getCurrencies } = this.props;
    await getCurrencies();

    // console.log(this.state)

    // const rate = this.props.currencies.find((curr) => curr = this.state.form.currency)
    // console.log(rate)

    const acum = parseFloat(this.state.totalExpenses) + parseFloat(this.state.form.value)





    await this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        exchangeRates: this.props.currencies,
      },
      expenses: this.props.expenses,
      totalExpenses: acum,

    }));


    await addExpenses(this.state.form);

    console.log(this.state.form.exchangeRates)

    console.log(this.state.form.currency)

    console.log(this.state.form.exchangeRates.find((curr) => curr === 'USD'))

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

  render() {
    const currencylist = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
      'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { value, description } = this.state.form;
    return (
      <div>
        <header data-testid="email-field">
          { this.props.email.email }
        </header>
        <div data-testid="total-field">{ this.totalExpenses }</div>
        <div data-testid="header-currency-field">BRL</div>
        <input
          name="value"
          value={ value }
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
          value = { description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencylist.map((element, key) => (
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
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ this.handleChange }
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
          onClick={ () => { this.addExpense(); } }
        >
          Adicionar Despesas
        </button>
        <div>

          { this.props.expenses.map((e) => (
            <div>{ e.id } </div>
          ))}

        </div>
      </div>
    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrency()),
  addExpenses: (expenses) => dispatch(add(expenses)),
});

const mapStateToProps = (state) => ({
  email: state.user,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToPros)(Wallet);
