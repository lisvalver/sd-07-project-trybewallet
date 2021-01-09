import React from 'react';
import FormDespesa from '../components/FormDespesa';
import Header from '../components/Header';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormDespesa />
        <Tabela />
      </div>
    );
  }
}

export default Wallet;
