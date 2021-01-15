import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-grid">
        <Header />
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
