import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fecthAction } from '../actions';

class Despesas extends Component {
  componentDidMount() {
    const { fecthEconomy } = this.props;
    fecthEconomy();
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
              <input id="value" data-testid="value-input" />
            </label>
            <label htmlFor="description">
              Descrição Despesas
              <input id="description" data-testid="description-input" />
            </label>
            <label htmlFor="currency">
              Currency Despesas
              {'   '}
              <select id="currency" data-testid="currency-input">
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
                <select id="method" data-testid="method-input">
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
                <select id="tag" data-testid="tag-input">
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
          <button type="button">Adicionar Despesas</button>
          {payload}
        </div>
      </div>
    );
  }
}

Despesas.propTypes = {
  payload: PropTypes.objectOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fecthEconomy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payload: state.economyApi.payload,
  isFetching: state.economyApi.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fecthEconomy: () => dispatch(fecthAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
