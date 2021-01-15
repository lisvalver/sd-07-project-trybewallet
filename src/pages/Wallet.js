import React from 'react';
import Header from '../componentes/Header';
import Form from '../componentes/Form';
import Tabela from '../componentes/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Tabela />
      </div>
    );
  }
}

export default Wallet;
