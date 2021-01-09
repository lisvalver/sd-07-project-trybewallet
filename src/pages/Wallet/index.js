import React from 'react';
import { Header, WalletForm, WalletTable } from '../../components';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <Header />
        <WalletForm />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
