import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addExpense, fetchCurrency } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { addExpenseProps } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value">
            Valor da Despesa:
            <input
              type="number"
              id="value"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option value="USD" data-testid="USD">USD</option>
              <option value="CAD" data-testid="CAD">CAD</option>
              <option value="EUR" data-testid="EUR">EUR</option>
              <option value="GBP" data-testid="GBP">GBP</option>
              <option value="ARS" data-testid="ARS">ARS</option>
              <option value="BTC" data-testid="BTC">BTC</option>
              <option value="LTC" data-testid="LTC">LTC</option>
              <option value="JPY" data-testid="JPY">JPY</option>
              <option value="CHF" data-testid="CHF">CHF</option>
              <option value="AUD" data-testid="AUD">AUD</option>
              <option value="CNY" data-testid="CNY">CNY</option>
              <option value="ILS" data-testid="ILS">ILS</option>
              <option value="ETH" data-testid="ETH">ETH</option>
              <option value="XRP" data-testid="XRP">XRP</option>
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button type="button" onClick={ () => addExpenseProps() }>
              Adicionar Despesa
            </button>
          </label>
        </form>
        <Table />
      </div>

    );
  }
}

const mapStateToProps = () => ({
  // email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  addExpenseProps: () => dispatch(addExpense()),
});

Wallet.propTypes = {
  getCurrency: PropTypes.func.isRequired,
  addExpenseProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
