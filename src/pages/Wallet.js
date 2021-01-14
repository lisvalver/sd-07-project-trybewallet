import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import WalletFunction from '../Components/WalletFunction';
import Table from '../Components/WalletTable';
import '../App.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      cambio: 'BRL',
    };
  }

  render() {
    const { amount, cambio } = this.state;
    const { email } = this.props;
    return (
      <div className="container-wallet">
        <Header user={ email } amount={ amount } cambio={ cambio } />
        <div className="body-wallet">
          <WalletFunction />
          <Table />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
