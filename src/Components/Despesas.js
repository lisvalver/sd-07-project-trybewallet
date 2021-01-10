import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fecthAction, wallet } from '../actions';

class Despesas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleApi = this.handleApi.bind(this);
  }

  componentDidMount() {
    const { fecthEconomy } = this.props;
    fecthEconomy();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleApi() {
    const { value, description, currency, method, tag } = this.state;
    const { walletSave, fecthEconomy } = this.props;
    fecthEconomy();
    const { payload } = this.props;
    walletSave({ value, description, currency, method, tag, exchangeRates: payload });
  }

  render() {
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    const { isFetching, currency } = this.props;
    const { value, description } = this.state;

    return (
      <div>
        {isFetching ? (
          <p> Loading... </p>
        ) : (
          <div>
            <label htmlFor="value">
              Valor Despesas
              <input
                name="value"
                id="value"
                value={ value }
                onChange={ this.onInputChange }
                data-testid="value-input"
                required
              />
            </label>
            <label htmlFor="description">
              Descrição Despesas
              <input
                name="description"
                id="description"
                value={ description }
                onChange={ this.onInputChange }
                data-testid="description-input"
                required
              />
            </label>
            <label htmlFor="currency">
              Currency Despesas
              {'   '}
              <select
                name="currency"
                id="currency"
                data-testid="currency-input"
                onChange={ this.onInputChange }
                required
              >
                <option value=""> Selecione uma opção </option>
                { currency && currency.map((opcao) => (
                  <option key={ opcao } data-testid={ opcao } value={ opcao }>
                    {opcao}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <label htmlFor="method">
                Método de Pagamento
                {'   '}
                <select
                  name="method"
                  id="method"
                  data-testid="method-input"
                  onChange={ this.onInputChange }
                  required
                >
                  {method.map((pag) => (
                    <option key={ pag } data-testid={ pag } value={ pag }>
                      {pag}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="tag">
                Categoria
                {'   '}
                <select
                  name="tag"
                  id="tag"
                  data-testid="tag-input"
                  onChange={ this.onInputChange }
                  required
                >
                  {categoria.map((tag) => (
                    <option key={ tag } data-testid={ tag } value={ tag }>
                      {tag}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
        <button type="button" onClick={ this.handleApi }>
          Adicionar Despesas
        </button>
      </div>
    );
  }
}

Despesas.propTypes = {
  payload: PropTypes.objectOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currency: PropTypes.objectOf.isRequired,
  walletSave: PropTypes.func.isRequired,
  fecthEconomy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payload: state.economyApi.payload,
  expenses: state.wallet.expenses,
  currency: state.economyApi.currency,
  isFetching: state.economyApi.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fecthEconomy: () => dispatch(fecthAction()),
  walletSave: (expenses) => dispatch(wallet(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
