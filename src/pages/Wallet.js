import React from 'react';
import WalletHeader from '../components/WallerHeader';
import AddExpenses from '../components/AddExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <AddExpenses />
      </div>
    );
  }
}

export default Wallet;
