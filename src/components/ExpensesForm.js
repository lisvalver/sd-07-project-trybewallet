import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchApiThunk } from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  // fazer o dispatch da requisição das moedas quando carregar a página
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  clickButton() {
    const { addingExpense, fetchApi } = this.props;
    addingExpense(this.state);
    fetchApi();
    // resetState();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            placeholder="valor da despesa"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
          <input
            type="text"
            placeholder="descrição"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleInput }
            data-testid="currency-input"
          >
            <option value="">Moeda</option>
            {currencies && currencies.map((item) => (
              <option
                value={ item }
                key={ item }
                data-testid={ item }
              >
                { item }
              </option>
            ))}
          </select>
          <select
            name="method"
            value={ method }
            onChange={ this.handleInput }
            data-testid="method-input"
          >
            <option value="">Método de Pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleInput }
            data-testid="tag-input"
          >
            <option value="">Selecione Tag</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button type="button" onClick={ this.clickButton }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApiThunk()),
  addingExpense: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  addingExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
