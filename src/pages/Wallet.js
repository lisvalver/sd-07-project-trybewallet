import React from 'react';
import WalletHeader from '../components/WallerHeader';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
