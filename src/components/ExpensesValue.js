import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesValue extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <spam data-testid="total-field">{+expenses}</spam>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

export default connect(mapStateToProps)(ExpensesValue);

ExpensesValue.propTypes = {
  expenses: PropTypes.number.isRequired,
};
