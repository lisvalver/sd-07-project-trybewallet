import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header { ...this.props } />
        <ExpenseForm { ...this.props } />
        <ExpensesTable { ...this.props } />
      </div>
    );
  }
}

export default Wallet;
