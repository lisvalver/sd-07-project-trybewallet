import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchAPIExchanges } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { addExpenses, fetchAPI } = this.props;
    addExpenses(this.state);
    fetchAPI();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              placeholder="Valor da despesa"
              name="value"
              value={ value }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              placeholder="Descrição da despesa"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInputChange }
            >
              <option value="">Selecione a moeda</option>
              { currencies.map((curr) => (
                <option
                  value={ curr }
                  key={ curr }
                  data-testid={ curr }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleInputChange }
            >
              <option>Selecione o método de pagamento</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria da despesa:
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleInputChange }
              value={ tag }
            >
              <option>Selecione a categoria</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIExchanges()),
  addExpenses: (expense) => dispatch(addExpense(expense)),
});

Form.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
