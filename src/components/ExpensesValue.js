import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesValue extends Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  componentDidMount() {
    this.updateExpenses();
  }

  updateExpenses() {
    const { expenses } = this.props;
    this.setState({ expenses });
  }

  render() {
    const { expenses } = this.state;
    return (
      <spam data-testid="total-field">{expenses}</spam>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

export default connect(mapStateToProps)(ExpensesValue);

ExpensesValue.propTypes = {
  expenses: PropTypes.number.isRequired,
};
