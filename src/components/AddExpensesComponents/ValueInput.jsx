import React from 'react';
import PropTypes from 'prop-types';

export default function Value({ changeState }) {
  return (
    <label htmlFor="value">
      Valor:
      <input
        id="value"
        step="0.01"
        type="number"
        data-testid="value-input"
        onChange={ changeState }
      />
    </label>
  );
}

Value.propTypes = {
  changeState: PropTypes.func.isRequired,
};
