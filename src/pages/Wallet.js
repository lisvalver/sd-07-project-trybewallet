import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAction, fetchCurrencies, editedExpenseAction } from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: '',
      tag: '',
      method: '',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateState = this.updateState.bind(this);
    this.sumOfExpenses = this.sumOfExpenses.bind(this);
    this.editExpense = this.editExpense.bind(this);
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
    const { addExpense, getCurrencies, currencies } = this.props;
    getCurrencies();

    this.setState(() => (
      {
        exchangeRates: currencies,
      }), () => {
      addExpense(this.state);
      this.setState((prevState) => (
        {
          id: prevState.id + 1,
        }));
    });
  }

  editExpense() {
    const { editingId, arrayOfExpenses, currencies, confirmEditExpense } = this.props;

    const {
      value,
      currency,
      tag,
      method,
      description,
    } = this.state;

    arrayOfExpenses[editingId].value = value;
    arrayOfExpenses[editingId].currency = currency;
    arrayOfExpenses[editingId].description = description;
    arrayOfExpenses[editingId].exchangeRates = currencies;
    arrayOfExpenses[editingId].method = method;
    arrayOfExpenses[editingId].tag = tag;
    confirmEditExpense(arrayOfExpenses[editingId]);
  }

  sumOfExpenses() {
    const { arrayOfExpenses } = this.props;
    const totalSpent = arrayOfExpenses.reduce((acc, current) => {
      const coin = current.currency;
      const valor = current.exchangeRates[coin].ask;
      return current.value * valor + acc;
    }, 0);
    return totalSpent;
  }

  submitForm() {
    this.updateState();
    this.sumOfExpenses();
  }

  render() {
    const total = this.sumOfExpenses();
    const { logged, currencies, isEditing } = this.props;
    const {
      value,
      currency,
      method,
    } = this.state;

    const editingButton = (
      <button
        type="button"
        onClick={ this.editExpense }
      >
        Editar despesa
      </button>
    );

    const addingButton = (
      <button
        type="button"
        onClick={ this.submitForm }
      >
        Adicionar despesa
      </button>
    );

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
              id="value-input"
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
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
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
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
              id="tag-input"
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
          { isEditing ? editingButton : addingButton }
        </fieldset>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logged: state.user.email,
  arrayOfExpenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isEditing: state.wallet.isEditing,
  editingId: state.wallet.editingId,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  getCurrencies: () => dispatch(fetchCurrencies()),
  confirmEditExpense: (expense) => dispatch(editedExpenseAction(expense, false)),
});

Wallet.propTypes = {
  arrayOfExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  logged: PropTypes.string.isRequired,
  editingId: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  confirmEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
