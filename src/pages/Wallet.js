import React from 'react';
import Header from '../components/Header';
import ExpenseAddForm from '../components/ExpenseAddForm';
import SpendTable from '../components/SpendTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseAddForm />
        <SpendTable />
      </div>
    );
  }
}

export default Wallet;
