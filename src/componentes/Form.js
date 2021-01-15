import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpense } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies(); // enviando a action fetchMovies
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async clickButton() {
    const { getCurrencies, add } = this.props;
    await getCurrencies();
    add(this.state);
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>

        <label htmlFor="valor">
          Valor:
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          <option>moeda</option>
          {currencies.map((currencie) => (
            <option
              value={ currencie }
              key={ currencie }
              data-testid={ currencie }
            >
              {currencie}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="">Metodo de Pagamento:</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Tag:</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.clickButton() }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  add: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
