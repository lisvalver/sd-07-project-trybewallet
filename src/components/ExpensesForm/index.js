import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpenses } from '../../actions';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitGlobalState = this.submitGlobalState.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  submitGlobalState() {
    const { submitStateToProps } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expensesObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    submitStateToProps(expensesObj);
    this.setState({ id: id + 1, value: 0 });
  }

  render() {
    const { currencies } = this.props;
    const { currency, method, value } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="expense-value">
            Valor:
            <input
              value={ value }
              onChange={ this.handleInput }
              type="number"
              data-testid="value-input"
              name="value"
            />
          </label>
          <label htmlFor="expense-description">
            Descrição:
            <input
              onChange={ this.handleInput }
              name="description"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              id="currencies"
              value={ currency }
              onChange={ this.handleInput }
              name="currency"
              data-testid="currency-input"
            >
              {currencies.map((item, index) => (
                <option
                  key={ index }
                  data-testid={ item }
                >
                  {item}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de Pagamento:
            <select
              value={ method }
              id="payment-method"
              name="method"
              onChange={ this.handleInput }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="payment-method">
            Tag:
            <select
              onChange={ this.handleInput }
              name="tag"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.submitGlobalState }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  submitStateToProps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => (dispatch(fetchCurrencies())),
  submitStateToProps: (expensesObj) => (dispatch(saveExpenses(expensesObj))),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
