import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchApi, updateTotal } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeRates: {},
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  requestApi() {
    const { callApi } = this.props;
    callApi();
  }

  handlechange(event) {
    const { currencies } = this.props;
    this.setState({
      [event.target.id]: event.target.value,
      exchangeRates: currencies,
    });
  }

  handleclick() {
    const { callApi, addExp, upTotal } = this.props;
    callApi();
    addExp(this.state);
    this.setState((prevState) => ({
      exchangeRates: {},
      id: prevState.id + 1,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
    upTotal();
  }

  render() {
    const { optionCurrencies } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="value">
            Valor:
            <input
              value={ value }
              id="value"
              type="number"
              data-testid="value-input"
              onChange={ (event) => this.handlechange(event) }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              value={ description }
              type="text"
              data-testid="description-input"
              onChange={ (event) => this.handlechange(event) }
            />
          </label>
          <label htmlFor="currency">
            Moeda:

            <select
              id="currency"
              value={ currency }
              onChange={ (event) => this.handlechange(event) }
              data-testid="currency-input"
            >
              {optionCurrencies.map((curr) => (
                <option
                  data-testid={ curr[0] }
                  value={ curr[0] }
                  key={ curr[0] }
                >
                  { curr[0] }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de Pagamento:
            <select
              onChange={ (event) => this.handlechange(event) }
              value={ method }
              id="method"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Despesas:
            <select
              onChange={ (event) => this.handlechange(event) }
              id="tag"
              data-testid="tag-input"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleclick }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  optionCurrencies: Object.entries(state.wallet.currencies).filter(
    (currency) => currency[0] !== 'USDT',
  ),
});

const mapDispatchToProps = (dispatch) => ({
  callApi: () => dispatch(fetchApi()),
  addExp: (expense) => dispatch(addExpense(expense)),
  upTotal: () => dispatch(updateTotal()),
});

Form.propTypes = {
  optionCurrencies: PropTypes.string.isRequired,
  callApi: PropTypes.func.isRequired,
  addExp: PropTypes.func.isRequired,
  currencies: PropTypes.shape(PropTypes.object).isRequired,
  upTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
