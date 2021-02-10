import React from 'react';
import Header from '../components/Header';
import Formulario from '../components/Formulario';
import TabelaDeGastos from '../components/TabelaDeGastos';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <TabelaDeGastos />
        <Formulario />
      </div>
    );
  }
}

export default Wallet;
