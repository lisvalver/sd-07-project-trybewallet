import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAction, addExpensesAction } from '../actions';

class Despesas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handlerExpensesChange = this.handlerExpensesChange.bind(this);
    this.handlerExpenses = this.handlerExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handlerExpensesChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async handlerExpenses() {
    const { addExpenses, currency, fetchCurrency } = this.props;
    await fetchCurrency();

    await this.setState((previous) => ({
      exchangeRates: { ...previous.exchangeRates, ...currency },
    }));
    addExpenses(this.state);

    this.setState((previous) => ({
      id: previous.id + 1,
      value: 0,
      description: '',
    }));
  }

  render() {
    const { currency } = this.props;
    const { value, description } = this.state;
    return (
      <section className="section-despesas">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handlerExpensesChange }
        />
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.handlerExpensesChange }
        />
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handlerExpensesChange }
        >
          {Object.keys(currency).filter((usdt) => usdt !== 'USDT')
            .map((currencies) => (
              <option
                key={ currencies }
                data-testid={ currencies }
                value={ currencies }
              >
                { currencies }
              </option>
            ))}
        </select>
        Método:
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handlerExpensesChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Tag
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handlerExpensesChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handlerExpenses }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  addExpenses: (expense) => dispatch(addExpensesAction(expense)),
});

Despesas.propTypes = {
  currency: PropTypes.shape({}).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
