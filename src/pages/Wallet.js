import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenses from '../components/AddExpenses';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <AddExpenses />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
