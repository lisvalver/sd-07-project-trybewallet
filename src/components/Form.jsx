import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpense } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });

    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
    this.getInput = this.getInput.bind(this);
    this.getInput = this.getInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDropDown = this.getDropDown.bind(this);
    this.getCurrencyDropDown = this.getCurrencyDropDown.bind(this);
  }

  componentDidMount() {
    this.handleUpdateRequest();
  }

  getInputValue(key) {
    const { state } = this;
    return state[key];
  }

  getInput(key, textLabel, type) {
    return (
      <label htmlFor={ `${key}-input` }>
        {textLabel}
        <input
          type={ type }
          key={ key }
          id={ `${key}-input` }
          data-testid={ `${key}-input` }
          name={ key }
          value={ this.getInputValue(key) }
          onChange={ this.handleInputChange }
        />
      </label>
    );
  }

  getDropDown(options) {
    return options
      .map((option) => (
        <option key={ option } value={ option }>{ option }</option>
      ));
  }

  getCurrencyDropDown() {
    const { currencies } = this.props;
    const listOfCurrencies = Object.keys(currencies || {}).map((i) => i);
    const filteredCurrencies = listOfCurrencies.filter((currency) => currency !== 'USDT');
    return filteredCurrencies
      .map((option) => (
        <option data-testid={ option } key={ option } value={ option }>{ option }</option>
      ));
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleUpdateRequest() {
    const { updateRequest } = this.props;
    updateRequest();
  }

  render() {
    return (
      <form>
        {this.getInput('value', 'Valor:', 'number')}
        {this.getInput('description', 'Descrição:', 'text')}

        <select
          data-testid="currency-input"
          value={ this.getInputValue('currency') }
          name="currency"
          onChange={ this.handleInputChange }
        >
          { this.getCurrencyDropDown() }
        </select>

        <select
          data-testid="method-input"
          value={ this.getInputValue('method') }
          name="method"
          onChange={ this.handleInputChange }
        >
          {this.getDropDown(['Dinheiro', 'Cartão de crédito', 'Cartão de débito'])}
        </select>

        <select
          data-testid="tag-input"
          value={ this.getInputValue('tag') }
          name="tag"
          onChange={ this.handleInputChange }
        >
          {this.getDropDown(['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'])}
        </select>

        <button
          type="button"
          onClick={ () => {
            const { currencies, expenses, setExpense } = this.props;
            this.handleUpdateRequest();
            const currenctExpense = this.state;
            currenctExpense.id = expenses.length;
            currenctExpense.exchangeRates = currencies;
            setExpense(currenctExpense);
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateRequest: () => dispatch(fetchCurrencies()),
  setExpense: (payload) => dispatch(saveExpense(payload)),
});

Form.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
