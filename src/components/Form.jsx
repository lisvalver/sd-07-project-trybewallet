import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchExchangeRate } = this.props;
    fetchExchangeRate(null, false);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  HandleSubmit(event) {
    event.preventDefault();
    const { fetchExchangeRate } = this.props;
    fetchExchangeRate(this.state, true);
    this.setState({
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies = [] } = this.props;
    return (
      <div>
        {
          (currencies.length === 0) ? (
            <span>Carregando...</span>
          ) : (
            <form onSubmit={ (event) => this.HandleSubmit(event) }>
              <label htmlFor="value">
                Valor:
                <input
                  id="value"
                  type="text"
                  name="value"
                  value={ value }
                  data-testid="value-input"
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  value={ currency }
                  data-testid="currency-input"
                  onChange={ (event) => this.handleChange(event) }
                >
                  {currencies.map((curr) => (
                    (curr !== 'USDT')
                    && (
                      <option key={ curr } value={ curr } data-testid={ curr }>
                        {curr}
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
                  value={ method }
                  data-testid="method-input"
                  onChange={ (event) => this.handleChange(event) }
                >
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
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ (event) => this.handleChange(event) }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>

              <label htmlFor="description">
                Descrição:
                <input
                  id="description"
                  type="text"
                  name="description"
                  value={ description }
                  data-testid="description-input"
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <button type="submit">Adicionar despesa</button>
            </form>
          )
        }
      </div>
    );
    // );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // addExpense: (expenses) => dispatch(addExpenses(expenses)),
  // requestExchangeRate: () => dispatch(requestExchangeRates()),
  // failedRequest: (error) => dispatch(failedRequests(error)),
  fetchExchangeRate: (expenses, isAddExpens) => dispatch(fetchAPI(expenses, isAddExpens)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.exchangeRateKeys,
});

Form.propTypes = {
  fetchExchangeRate: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
