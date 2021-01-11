import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getAPI, newExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { getCurrencies, currencies, newExpenses } = this.props;
    await getCurrencies();
    this.setState({ exchangeRates: currencies.apiData });
    const ex = { ...this.state };
    newExpenses(ex);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { user, currencies, expenses } = this.props;
    const { currency, description, value } = this.state;
    let initials = ['BRL'];
    if (currencies.wallet !== undefined) {
      initials = currencies.wallet.currencies;
    }
    let total = 0;
    if (expenses.length > 0) {
      total = expenses
        .map((exp) => exp.value * exp.exchangeRates[exp.currency].ask)
        .reduce((acc, cur) => acc + cur);
    }

    return (
      <div>
        <Header name={ user } />
        <form>
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            min="0"
            placeholder="Digite algum valor"
          />
          <p data-testid="header-currency-field">BRL</p>
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {initials.map((id) => (
              (id !== 'USDT')
             && (
               <option value={ id } data-testid={ id } key={ id }>
                 { id }
               </option>
             )
            ))}
          </select>
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Adicione uma descrição"
            data-testid="description-input"
          />
          <p data-testid="total-field">{ total }</p>
          <select
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button onClick={ () => this.handleSubmit() } type="button">
            Adicionar despesa
          </button>
        </form>
        Table
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getAPI()),
  newExpenses: (data) => dispatch(newExpense(data)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  newExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
