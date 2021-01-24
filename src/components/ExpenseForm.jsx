import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestCurrency } from '../actions';
// import apiCurrency from '../services/apiCurrency';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    // this.currencyInput = this.currencyInput.bind(this);

    /* this.state = {
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      currencyArray: [],
    }; */
  }

  async componentDidMount() {
    const { dispatchCurrencyFetch } = this.props;

    dispatchCurrencyFetch();
    /* const currencyInput = await apiCurrency();
    const currencyArray = (Object.keys(currency));
    currencyArray.splice(1, 1);
    this.currencyInput(currencyArray); */
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  /*   currencyInput(value) {
    this.setState({
      currencyArray: value,
    });
  }

 */
  /*  handleClick() {
    addExpense(this.state);
  } */

  render() {
    const { value, description, method, tag, currency } = this.props;

    return (
      <div className="expense-form">
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="description-input">
            Descrição de despesas
            <input
              nome="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              onChange={ this.handleInput }
            >
              {currency.map((cur) => (
                <option
                  data-testid={ cur }
                  name="currency"
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
              name="method"
              data-testid="method-input"
              onChange={ this.handleInput }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de Crédito</option>
              <option value="cartao-debito">Cartão de Débito</option>
            </select>
          </label>
          <label htmlFor="method-input">
            Categoria
            <select
              value={ tag }
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleInput }
            >
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar despesas</button>
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
  currency: state.walletReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyFetch: () => dispatch(requestCurrency()),
});

ExpenseForm.propTypes = {
  value: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  dispatchCurrencyFetch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps())(ExpenseForm);
