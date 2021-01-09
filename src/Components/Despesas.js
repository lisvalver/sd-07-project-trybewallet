import React, { Component } from 'react';
import 'react-dropdown/style.css';

class Despesas extends Component {
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

    return (
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
        <button type="button">Adicionar Despesas</button>
      </div>
    );
  }
}

export default Despesas;
