import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import actions from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesThunk } = this.props;
    fetchCurrenciesThunk();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  resetState() {
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { addExpenseDispatch, currencies, fetchCurrenciesThunk } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInput }
            data-testid="value-input"
            placeholder="Valor"
          />
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleInput }
            data-testid="description-input"
            placeholder="Descrição"
          />
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleInput }
          >
            { currencies && currencies.map((item) => (
              <option key={ item } data-testid={ item }>{item}</option>
            )) }
          </select>
          <select
            name="method"
            value={ method }
            onChange={ this.handleInput }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleInput }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ () => {
              fetchCurrenciesThunk();
              addExpenseDispatch(this.state);
              this.resetState();
            } }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addExpenseDispatch: actions.addExpenseAction,
  fetchCurrenciesThunk: actions.fetchCurrenciesThunk,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  addExpenseDispatch: PropTypes.func.isRequired,
  fetchCurrenciesThunk: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
