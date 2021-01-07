import React from 'react';
import FormExpense from '../components/FormExpense';
import Header from '../components/Header';
import TableExpense from '../components/TableExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormExpense />
        <TableExpense />
      </div>);
  }
}

export default Wallet;
