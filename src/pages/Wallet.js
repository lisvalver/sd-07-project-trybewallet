import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, addExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.hanldleDropdown = this.hanldleDropdown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAdd = this.showAdd.bind(this);
    this.state = {
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
    const { fetchCurrencyA } = this.props;
    fetchCurrencyA();
  }

  async onClick() {
    const { addExpensesA, fetchCurrencyA, currencies, expenses } = this.props;
    const { id } = this.state;
    let newId = 0;
    console.log(expenses.length);
    if (expenses.length === 0) {
      newId = id;
    } else {
      newId = id + 1;
    }
    await fetchCurrencyA();
    this.setState({
      exchangeRates:
        currencies,
      id: newId,
    }, () => {
      addExpensesA(this.state);
    });
  }

  showAdd() {
    const { expenses } = this.props;
    if (expenses[0]) {
      return expenses.map((expense) => {
        const { value } = expense;
        const { currency } = expense;
        const exchangeRates = expense.exchangeRates[currency].ask;
        return value * exchangeRates;
      }).reduce((acc, next) => acc + next);
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  hanldleDropdown() {
    const { currencies } = this.props;
    const arrayCurrencies = Object.entries(currencies);
    //  Remove element of Array
    //  https://pt.stackoverflow.com/questions/108032/remover-um-elemento-especifico-do-array-javascript
    arrayCurrencies.splice(1, 1);
    return arrayCurrencies.map((currencie) => (
      <option
        data-testid={ currencie[0] }
        key={ currencie[0] }
        value={ currencie[0] }
      >
        {currencie[0]}
      </option>
    ));
  }

  render() {
    const newTotal = this.showAdd();
    const { email } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">
            Email:
            { email }
          </div>
          <div data-testid="total-field">
            Total:
            { !newTotal ? 0 : newTotal }
          </div>
          <div data-testid="header-currency-field">
            Cambio: BRL
          </div>
        </header>
        <form>
          <input
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ 0 }
          />
          <textarea
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
          />
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {this.hanldleDropdown()}
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option
              key="Dinheiro"
              value="Dinheiro"
            >
              Dinheiro
            </option>
            <option
              key="Cartão de crédito"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              key="Cartão de débito"
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option
              key="Alimentação"
              value="Alimentação"
            >
              Alimentação
            </option>
            <option
              key="Lazer"
              value="Lazer"
            >
              Lazer
            </option>
            <option
              key="Trabalho"
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              key="Transporte"
              value="Transporte"
            >
              Transporte
            </option>
            <option
              key="Saúde"
              value="Saúde"
            >
              Saúde
            </option>
          </select>
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrencyA: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
  }).isRequired,
  addExpensesA: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyA: () => dispatch(fetchCurrency()),

  addExpensesA: (expenses) => dispatch(addExpenses(expenses)),
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
