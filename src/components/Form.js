import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates, addExpense } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.setStateCurrencies = this.setStateCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  setStateCurrencies() {
    const { currencies } = this.props;
    return (
      currencies.map((item) => (
        <option key={ item } data-testid={ item }>
          { item }
        </option>
      ))
    );
  }

  handleSubmit() {
    const { addExpense } = this.props;
    const { expense } = this.state;
    addExpense(expense);
  }

  render() {
    return (
      <form>
        <input
          data-testid="value-input"
          placeholder="Add value"
          value={ value }
          onChange={ this.handleInput }
          name="value"
        />
        <input
          data-testid="description-input"
          onChange={ this.handleInput }
          name="description"
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleInput }
        >
          <option value="">Currency</option>
          {this.setStateCurrencies()}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleInput }
        >
          <option value="">Method Payment</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleInput }
          >
            <option value="">Selecione Tag</option>
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleSubmit }>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(actions.addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

// Form.propTypes = {
//   userEmail: PropTypes.string.isRequired,
// };
