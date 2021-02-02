import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoeda, addExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
    //   description: '',
    //   currency: '',
    //   method: '',
    //   tag: '',
    //   value: 0,
    //   convertedValue: 0,
      id: 0,
    //   exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { id } = this.state;
    const { addExpense, currencies } = this.props;
    const exchangeRates = {
      ...currencies,
    };
    addExpense([this.state, exchangeRates]);
    this.setState({ id: id + 1 });
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        {
          currencies.length === 0 ? (
            <span>Loading...</span>
          ) : (
            <form>
              <label htmlFor="value">
                Valor da despesa:
                <input
                  id="value"
                  type="number"
                  name="value"
                  data-testid="value-input"
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="description">
                Descrição da despesa:
                <input
                  id="description"
                  type="text"
                  name="description"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                >
                  {Object.keys(currencies).map((coin) => (
                    (coin !== 'USDT')
                      && (
                        <option key={ coin } data-testid={ coin }>
                          {coin}
                        </option>
                      )
                  ))}
                </select>
              </label>

              <label htmlFor="method">
                Método de pagamento:
                <select
                  id="method"
                  name="method"
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option selected disabled value="">Selecione</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>

              <label htmlFor="tag">
                Tag:
                <select
                  id="tag"
                  name="tag"
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option selected disabled value="">Selecione</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>

              <button onClick={ this.handleClick } type="button">Adicionar despesa</button>
            </form>
          )
        }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchMoeda()),
  addExpense: (expenses) => dispatch(addExpenses(expenses)),
  // requestExchangeRate: () => dispatch(requestExchangeRates()),
  // failedRequest: (error) => dispatch(failedRequests(error)),
//   fetchExchangeRate: (expenses, isAddExpens) => dispatch(fetchAPI(expenses, isAddExpens)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
