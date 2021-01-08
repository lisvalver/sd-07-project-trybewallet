import React from 'react';
import FormDespesa from '../components/FormDespesa';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        TrybeWallet
        <FormDespesa />
      </div>
    );
  }
}

export default Wallet;
