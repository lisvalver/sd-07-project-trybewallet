import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        { expenses.map((element, index) => {
          const { cash, currency, methodInput, tagInput, infor } = element;
          return (
            <div key={ index }>
              <span>{ cash }</span>
              <span>{ currency }</span>
              <span>{ methodInput }</span>
              <span>{ tagInput }</span>
              <span>{ infor }</span>
            </div>);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Expenses);

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf()),
}.isRequired;
