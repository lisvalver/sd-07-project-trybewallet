import React from 'react';
import { Header, WalletForm } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
