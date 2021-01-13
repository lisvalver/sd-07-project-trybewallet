import React from 'react';
import Header from '../components/header';
import Expenses from '../components/expenses';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
        <Table />
      </div>
    );
  }
}

export default Wallet;
