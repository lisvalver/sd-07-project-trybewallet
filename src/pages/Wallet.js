import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAction, fetchCurrencies } from '../actions/index';
/* import Table from '../components/Table' */

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: '',
      tag: '',
      paymentMethod: '',
      description: '',
      exchange: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateState = this.updateState.bind(this);
    this.sumOfExpenses = this.sumOfExpenses.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  updateState() {
    const { addExpense, getCurrencies } = this.props;
    getCurrencies();
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    addExpense(this.state);
  }

  sumOfExpenses() {
    const { arrayOfExpenses } = this.props;
    const { wallet } = arrayOfExpenses;
    const { expenses } = wallet;

    let totalSpent = 0;
    for (let index = 0; index < expenses.length; index += 1) {
      totalSpent += parseInt(expenses[index].value, 10);
    }
    return totalSpent;
  }

  submitForm() {
    this.updateState();
    this.sumOfExpenses();
  }

  render() {
    const { logged, currencies } = this.props;
    const { currency } = this.state;
    const total = this.sumOfExpenses();
    return (
      <div>
        <header>
          <p>Wallet</p>
          <p data-testid="email-field">{ logged }</p>
        </header>
        <section>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <fieldset>
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method-input">
            Pagamento:
            <select
              data-testid="method-input"
              name="paymentMethod"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Crédito">Cartão de crédito</option>
              <option value="Débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {Object.keys(currencies)
                .filter((coin) => coin !== 'USDT')
                .map(((coin) => (
                  <option
                    key={ coin }
                    data-testid={ coin }
                    value={ coin }
                  >
                    { coin }
                  </option>
                )))}
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação" name="description">Alimentação</option>
              <option value="Lazer" name="description">Lazer</option>
              <option value="Trabalho" name="description">Trabalho</option>
              <option value="Transporte" name="description">Transporte</option>
              <option value="Saúde" name="description">Saúde</option>
            </select>
          </label>
          <button
            onClick={ this.submitForm }
            type="button"
          >
            Adicionar despesa
          </button>
        </fieldset>
        {/*   <Table /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logged: state.user.email,
  arrayOfExpenses: state,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  arrayOfExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  logged: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
