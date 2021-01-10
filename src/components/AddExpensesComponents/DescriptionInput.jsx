import React from 'react';
import PropTypes from 'prop-types';

export default function Description({ changeState }) {
  return (
    <label htmlFor="description">
      Descrição:
      <input
        id="description"
        type="text"
        data-testid="description-input"
        onChange={ changeState }
      />
    </label>
  );
}

Description.propTypes = {
  changeState: PropTypes.func.isRequired,
};
