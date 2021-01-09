import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { excludeExpenses } from '../actions';

class Exclude extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { expense, excludeExpense } = this.props;
    excludeExpense(expense);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="delete-btn"
        >
          a
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  excludeExpense: (expenses) => dispatch(excludeExpenses(expenses)),
});

// const mapStateToProps = (state) => ({
//   currencies: state.wallet.exchangeRateKeys,
// });

Exclude.propTypes = {
  excludeExpense: PropTypes.func.isRequired,
  expense: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  // shape({
  //   value: PropTypes.number.isRequired,
  //   currency: PropTypes.string.isRequired,
  //   method: PropTypes.string.isRequired,
  //   tag: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   id: PropTypes.number.isRequired,
  //   exchangeRates: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //     PropTypes.object,
  //   ]).isRequired,
  // }).isRequired,
};

export default connect(null, mapDispatchToProps)(Exclude);
