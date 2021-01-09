import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const Wallet = (props) => {
  const { valor, descricao, save, clear } = props;
  return (
    <div className="form">
      <Header />
      <div className="row">
        <div className="col-12 col-md-6">
          <label htmlFor="valor">
            Valor
            <input
              id="valor"
              type="text"
              name="valor"
              value={ valor }
              className="form-control"
              data-testid="value-input"
            />
          </label>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor="descricao">
          descrição da despesa
          <input
            type="text"
            name="descricao"
            value={ descricao }
            className="form-control"
            data-testid="description-input"
          />
        </label>
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor="moedas">
          Moeda
          <select name="moedas" data-testid="currency-input" id="moedas">
            {/* deve ser dinâmico */}
            <option data-testid="USD" value="USD">
              USD
            </option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ARS">ARS</option>
            <option value="BTC">BTC</option>
            <option value="LTC">LTC</option>
            <option value="JPY">JPY</option>
            <option value="CHF">CHF</option>
            <option value="AUD">AUD</option>
            <option value="CNY">CNY</option>
            <option value="ILS">ILS</option>
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
          </select>
        </label>
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor="metodo">
          Método de pagamento
          <select name="metodo" data-testid="method-input" id="metodo">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor="tag">
          Tag
          <select name="tag" data-testid="tag-input" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={ save }>
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-secundary ml-2"
            onClick={ clear }
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

Wallet.propTypes = {
  save: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  descricao: PropTypes.number.isRequired,
  valor: PropTypes.number.isRequired,
};
