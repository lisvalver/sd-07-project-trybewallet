import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoedaAPI, addExpensesToStore } from '../actions';
import CoinOption from '../componentes/CoinOption';
import Table from '../componentes/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: 0,
      valueTotal: 0,
      id: -1,
      exchangeRates: {},
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    this.saveStateInTheStore = this.saveStateInTheStore.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    getAPI();
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveStateInTheStore() {
    const { valueTotal, ...rest } = this.state;
    const { addingExpenses } = this.props;
    console.log(rest);
    addingExpenses(rest);
  }

  addExpenses() {
    const { curr, currencies } = this.props;
    const { valueTotal, value, id } = this.state;
    const moeda = curr;
    const moedas = currencies;
    const newvalue = parseInt(valueTotal, 10) + parseInt(value, 10);
    const newId = parseInt(id, 10);
    this.setState({ exchangeRates: moedas }, () => { this.saveStateInTheStore(); });
    this.setState({ currency: moeda });
    this.setState({ valueTotal: `${newvalue}` });
    this.setState({ id: newId + 1 });
  }

  render() {
    const { email } = this.props;
    const { description, value, valueTotal, currency, method, tag } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h4 data-testid="total-field">{ valueTotal }</h4>
          <h4 data-testid="header-currency-field">{ currency }</h4>
        </header>
        <form>
          <label htmlFor="value">
            Adicione valor da despesa
            <input
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleEvent }
            />
          </label>
          <label htmlFor="discription">
            Descrição da despesa
            <input
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleEvent }
            />
          </label>
          <CoinOption name="currency" />
          Selecione Método de Pagamento:
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleEvent }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débitoo</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleEvent }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button" onClick={ this.addExpenses }>Adicionar despesa</button>
        </form>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getAPI: PropTypes.func.isRequired,
  curr: PropTypes.number.isRequired,
  currencies: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
  addingExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(fetchMoedaAPI()),
  addingExpenses: (payload) => dispatch(addExpensesToStore(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  curr: state.wallet.curr,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
