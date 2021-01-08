import React from 'react';
import PropTypes from 'prop-types';

class TagSelect extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tagInput">
        Tag:
        <select
          onChange={ handleChange }
          data-testid="tag-input"
          id="tagInput"
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

export default TagSelect;

TagSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
