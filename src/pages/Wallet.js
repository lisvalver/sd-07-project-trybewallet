import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Despesas from '../components/Despesas';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Header />
        <br />
        <Despesas />
      </header>
    );
  }
}

export default connect()(Wallet);
