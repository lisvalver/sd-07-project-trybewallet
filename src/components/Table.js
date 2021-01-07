import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    // const { currencies, expenses } = this.props;
    const INITIAL_VALUE = 0;
    const CURRENCY = 'BRL';
    return (
      <div>
        <div>
          <h4 data-testid="total-field">
            {INITIAL_VALUE}
          </h4>
        </div>
        <div>
          <h4 data-testid="header-currency-field">
            {CURRENCY}
          </h4>
        </div>
      </div>
    );
  }
}
/*
  Table.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
};
*/

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
