import React from 'react';
import { Header, WalletForm, WalletTable } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
