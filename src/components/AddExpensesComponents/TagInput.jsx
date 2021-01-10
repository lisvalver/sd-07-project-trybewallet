import React from 'react';
import PropTypes from 'prop-types';

export default function Tag({ changeState }) {
  return (
    <label htmlFor="tag">
      Tag:
      <select
        id="tag"
        data-testid="tag-input"
        onChange={ changeState }
      >
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    </label>
  );
}

Tag.propTypes = {
  changeState: PropTypes.func.isRequired,
};
