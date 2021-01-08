import React from 'react';
import Header from '../Components/Header';
import WalletFunction from '../Components/WalletFunction';
import Table from '../Components/WalletTable';
import '../App.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
      },
    };
  }

  render() {
    const { user, wallet } = this.state;
    return (
      <div className="container-wallet">
        <Header user={ user.email } amount={ wallet.currencies } />
        <div className="body-wallet">
          <WalletFunction />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
