import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';

class AddExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
    // this.clearState = this.clearState.bind(this);
  }

  async componentDidMount() {
    const { fetchAPI } = this.props;
    await fetchAPI();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  sumExpenses(acc, currValue) {
    const baseValue = parseFloat(currValue.value);
    const multiplier = parseFloat(currValue.exchangeRates[currValue.currency].ask);
    return acc + baseValue * multiplier;
  }

  // clearState() {
  //   this.setState = ({
  //     value: '',
  //     description: '',
  //     currency: '',
  //     method: '',
  //     tag: '',
  //   });
  // }

  render() {
    const { newExpense, currencies, fetchAPI } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <input
          onChange={ this.handleChange }
          value={ value }
          name="value"
          type="text"
          data-testid="value-input"
        />
        <input
          onChange={ (event) => this.handleChange(event) }
          value={ description }
          name="description"
          type="text"
          data-testid="description-input"
        />
        <select
          onChange={ (event) => this.handleChange(event) }
          value={ currency }
          name="currency"
          data-testid="currency-input"
        >
          {currencies.map((coin) => (
            <option key={ coin } value={ coin } data-testid={ coin }>
              {coin}
            </option>
          ))}
        </select>
        <span>
          {}
        </span>
        <select
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          onChange={ (event) => this.handleChange(event) }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          onClick={ () => {
            fetchAPI();
            newExpense(this.state);
            // this.clearState();
          } }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = {
  newExpense: addExpense,
  fetchAPI: fetchCurrencies,
};

AddExpenses.propTypes = {
  currencies: PropTypes.string.isRequired,
  newExpense: PropTypes.func.isRequired,
  fetchAPI: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
