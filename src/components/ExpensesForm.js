import React from 'react';
/// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class ExpensesForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="value-input"
          />
          <input
            type="text"
            data-testid="description-input"
          />
          <select data-testid="currency-input">
            <option value="USD" data-testid="USD">USD</option>
            <option value="CAD" data-testid="CAD">CAD</option>
            <option value="EUR" data-testid="EUR">EUR</option>
            <option value="GBP" data-testid="GBP">GBP</option>
            <option value="ASR" data-testid="ASR">ASR</option>
            <option value="BTC" data-testid="BTC">BTC</option>
            <option value="LTC" data-testid="LTC">LTC</option>
            <option value="JPY" data-testid="JPY">JPY</option>
            <option value="CHF" data-testid="CHF">CHF</option>
            <option value="AUD" data-testid="AUD">AUD</option>
            <option value="CNY" data-testid="CNY">CNY</option>
            <option value="ILS" data-testid="ILS">ILS</option>
            <option value="ETH" data-testid="ETH">ETH</option>
            <option value="XRP" data-testid="XRP">XRP</option>
          </select>
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Credito">Cartão de crédito</option>
            <option value="Debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button type="button">
          Adicionar despesa
        </button>
      </div>
    );
  }
}

export default ExpensesForm;
// alterar pra connect qnd juntar com o redux
