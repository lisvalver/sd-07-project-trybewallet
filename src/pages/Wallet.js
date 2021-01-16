import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AddExpensesForm from '../components/AddExpensesForm';
import ChangeExpensesForm from '../components/ChangeExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { edtRequest } = this.props;
    return (
      <div className="wallet-grid">
        <Header />
        { edtRequest ? <ChangeExpensesForm /> : <AddExpensesForm /> }
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.defaultProps = {
  edtRequest: false,
};

Wallet.propTypes = {
  edtRequest: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  edtRequest: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
