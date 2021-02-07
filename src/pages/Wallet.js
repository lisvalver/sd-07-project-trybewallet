import React from 'react';
import Expenses from '../components/expenses';
import Header from '../components/header';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Expenses />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
