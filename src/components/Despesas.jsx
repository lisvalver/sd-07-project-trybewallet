import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAction, addExpensesAction } from '../actions';

class Despesas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  async componentDidMount() {
    const { fetchCurrency } = this.props;
    await fetchCurrency();
  }

  handlerExpensesChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async handlerExpenses() {
    const { addExpenses, currency, fetchCurrency, addIdWallet, id } = this.props;
    await fetchCurrency();

    this.setState((previous) => ({
      exchangeRates: { ...previous.exchangeRates, ...currency },
    }));
    await addExpenses({ id, ...this.state });

    await addIdWallet();

    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { currency } = this.props;
    const { value, description, method, tag } = this.state;
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
          <option selected={ method === 'Dinheiro' } value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Tag
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handlerExpensesChange }
        >
          <option
            selected={ tag === 'Alimentação' }
            value="Alimentação"
          >
            Alimentação
          </option>
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
  editExpense: state.wallet.editExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  addExpenses: (expense) => dispatch(addExpensesAction(expense)),
});

Despesas.propTypes = {
  currency: PropTypes.shape({}).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  addIdWallet: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
