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
      method: '',
      tag: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleApi = this.handleApi.bind(this);
  }
  // componentDidMount(){
  //   const {fecthEconomy } = this.props;
  //   fecthEconomy();
  // }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleApi() {
    const { walletSave } = this.props;
    const { value, description, currency, method, tag } = this.state;
    walletSave({ value, description, currency, method, tag });
  }

  render() {
    const options = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    const { isFetching, payload } = this.props;

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
                onChange={ this.onInputChange }
                data-testid="value-input"
              />
            </label>
            <label htmlFor="description">
              Descrição Despesas
              <input
                name="description"
                onChange={ this.onInputChange }
                data-testid="description-input"
              />
            </label>
            <label htmlFor="currency">
              Currency Despesas
              {'   '}
              <select
                name="currency"
                data-testid="currency-input"
                onChange={ this.onInputChange }
              >
                {options.map((opcao) => (
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
                  data-testid="method-input"
                  onChange={ this.onInputChange }
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
                  data-testid="tag-input"
                  onChange={ this.onInputChange }
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
        <div className="teste">
          <button type="button" onClick={ this.handleApi }>
            Adicionar Despesas
          </button>
          <div>{payload}</div>
        </div>
      </div>
    );
  }
}

Despesas.propTypes = {
  payload: PropTypes.objectOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
  walletSave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payload: state.economyApi.payload,
  isFetching: state.economyApi.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fecthEconomy: () => dispatch(fecthAction()),
  walletSave: (despesas) => dispatch(wallet(despesas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
