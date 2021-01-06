import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import ExpenseList from '../components/ExpenseList';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  render() {
    const { editExpense } = this.props;

    return (
      <div>
        <Header />
        {editExpense ? <EditExpense /> : <AddExpense />}
        <ExpenseList />
      </div>
    );
  }
}

Wallet.propTypes = { editExpense: PropTypes.func.isRequired };

const mapStateToProps = ({ wallet: { editExpense } }) => ({ editExpense });

export default connect(mapStateToProps)(Wallet);
