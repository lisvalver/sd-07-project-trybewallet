import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import { fetchExchangeRates } from '../actions/wallet';

class Form extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.setStateCurrencies = this.setCurrencies.bind(this);
    this.handleClick = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { fetchExchanges } = this.props;
    fetchExchanges();
  }

  setCurrencies() {
    const { currencies } = this.props;
    return (
      currencies && currencies.map((item) => (
        <option key={ item } data-testid={ item }>
          { item }
        </option>
      ))
    );
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { addExpense } = this.props;
    addExpense(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
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
          placeholder="Add description"
          value={ description }
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
          {this.setCurrencies()}
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
          Form
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
  fetchExchanges: () => dispatch(fetchExchangeRates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchExchanges: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};
