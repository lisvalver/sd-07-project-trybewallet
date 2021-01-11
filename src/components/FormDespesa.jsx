import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../store';
import * as Actions from '../actions';
// import * as api from '../services/api';

class FormDespesa extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    };
  }

  async handleClick() {
    const { fetchExchangeRates } = this.props;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;

    await fetchExchangeRates(value, description, currency, paymentMethod, category);
    // console.log(store.getState());
    this.sumExpenses();
  }

  sumExpenses() {
    const { wallet, sumAll } = this.props;
    let sumValues = 0;

    wallet.expenses.forEach((element) => {
      const data = wallet.currencies.find(
        (element2) => element2.code === element.currency,
      );
      console.log(data);
      sumValues += parseFloat(data.ask) * parseFloat(element.value);
      // console.log(sumValues);
    });

    sumAll(sumValues);

    this.setState({
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // prettier-ignore
  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Adicionar Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Selecionar moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              {currencies.map((element) => (
                <option key={ element.name } data-testid={ element.code }>
                  {element.code}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.handleClick }>
            Adicionar despesas
          </button>
        </form>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      codein: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        codein: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  sumAll: PropTypes.func.isRequired,
  fetchExchangeRates: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  sumAll: Actions.sumAll,
  fetchExchangeRates: Actions.fetchExchangeRates,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
