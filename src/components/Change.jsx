import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEdited } from '../actions';

class Edit extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { expense, isEdit } = this.props;
    isEdit(expense.id);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="edit-btn"
        >
          e
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isEdit: (id) => dispatch(isEdited(id)),
});

Edit.propTypes = {
  isEdit: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Edit);
