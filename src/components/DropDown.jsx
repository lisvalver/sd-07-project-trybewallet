import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDown extends Component {
  constructor() {
    super();
    this.selectChange = this.selectChange.bind(this);
  }

  selectChange(event) {
    const sel = event.target;
    const value = sel.options[sel.selectedIndex].text;
    const { id, handleChange } = this.props;
    const selectOption = { target: { id, value } };
    handleChange(selectOption);
  }

  render() {
    // const { selectValue } = this.state;
    const { options, selectValue } = this.props;
    return (
      <div>
        <select value={ selectValue } onChange={ this.selectChange }>
          { options.map(
            (option, index) => (
              <option key={ index } value={ option }>{ option }</option>
            ),
          )}

        </select>
      </div>
    );
  }
}

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};

export default DropDown;
