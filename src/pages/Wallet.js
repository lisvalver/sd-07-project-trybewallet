import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { getCurrencies } = this.props;
    getCurrencies();
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
    const { addExpenses, getCurrencies, expenses, currencies } = this.props;
    const { totalExpenses, form } = this.state;
    await getCurrencies();

    await this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        exchangeRates: currencies,
      },
    }));
    await addExpenses(this.state.form);
    const valueConverted = form.value * currencies[form.currency].ask;
    const acum = parseFloat(totalExpenses) + parseFloat(valueConverted);
    await this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        value: valueConverted,
        exchangeRates: currencies,
      },
      expenses,
      totalExpenses: acum,

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

  render() {
    const currencylist = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
      'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { form } = this.state;
    const { totalExpenses } = this.state;
    const { expenses, email } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          { email.email }
        </header>
        <div data-testid="total-field">{ totalExpenses }</div>
        <div data-testid="header-currency-field">BRL</div>
        <input
          name="value"
          value={ form.value }
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
          value={ form.description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
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
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
          </tr>
          { expenses.map((e) => (
            <tr key={ e }>
              <td>{ e.description }</td>
              <td>{ e.tag }</td>
              <td>{ e.method }</td>
              <td>{ e.value }</td>
              <td>{ e.currency }</td>
              <td>{ e.description }</td>
              <td>{ e.description }</td>
              <td>{ e.description }</td>
              {/* <td>Editar/Excluir</td> */}
            </tr>
          ))}
        </table>
        <div>Editar/Excluir</div>
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

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};
