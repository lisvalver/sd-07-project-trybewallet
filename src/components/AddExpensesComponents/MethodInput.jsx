import React from 'react';
import PropTypes from 'prop-types';

export default function Method({ changeState }) {
  return (
    <label htmlFor="method">
      Método de pagamento:
      <select
        id="method"
        data-testid="method-input"
        onChange={ changeState }
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    </label>
  );
}

Method.propTypes = {
  changeState: PropTypes.func.isRequired,
};
