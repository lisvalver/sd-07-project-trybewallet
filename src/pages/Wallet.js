import React from 'react';
import { ExpenseTable, Header, InfosInput } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <InfosInput />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
