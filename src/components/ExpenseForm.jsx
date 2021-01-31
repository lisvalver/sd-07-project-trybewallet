import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../actions';
// import walletReducer from '../reducers';
import apiCurrency from '../services/apiCurrency';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    // this.handleInput = this.handleInput.bind(this);
    // this.currencyInput = this.currencyInput.bind(this);

    this.state = {
      value: '',
      currency: [],
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const currencyApi = await apiCurrency();
    const currencyArray = (Object.keys(currencyApi));
    currencyArray.splice(1, 1);
    this.currencyInput(currencyArray);
  }

  currencyInput(value) {
    this.setState({
      currency: value,
    });
  }

  /*  handleClick() {
    addExpense(this.state);
  } */

  render() {
    const { value, currency, description, method, tag } = this.state;
    const { add } = this.props;

    return (
      <div className="expense-form">
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              value={ value }
              data-testid="value-input"
              onChange={ (e) => this.setState({ value: e.target.value }) }
            />
          </label>
          <label htmlFor="description-input">
            Descrição de despesas
            <input
              value={ description }
              data-testid="description-input"
              onChange={ (e) => this.setState({ description: e.target.value }) }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              onChange={ (e) => this.setState({ currentCurrency: e.target.value }) }
            >
              {currency.map((cur) => (
                <option
                  data-testid={ cur }
                  value={ cur }
                  key={ cur }
                >
                  {cur}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Forma de pagamento
            <select
              value={ method }
              data-testid="method-input"
              onChange={ (e) => this.setState({ method: e.target.value }) }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-crédito">Cartão de crédito</option>
              <option value="cartao-débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="method-input">
            Categoria
            <select
              value={ tag }
              data-testid="tag-input"
              onChange={ (e) => this.setState({ tag: e.target.value }) }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => add(this.state) }
          >
            Adicionar despesas
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state.walletReducer,
  description: state.walletReducer,
  method: state.walletReducer,
  tag: state.walletReducer,
  currency: state.currency,
});

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addExpenses(e)),
});

ExpenseForm.propTypes = {
  /* value: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired, */
  add: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
