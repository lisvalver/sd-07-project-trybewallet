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
      cambio: 'BRL',
    };
  }

  render() {
    const { cambio } = this.state;
    const { email, totalExpenses } = this.props;
    return (
      <div className="container-wallet">
        <Header user={ email } amount={ totalExpenses } cambio={ cambio } />
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
  totalExpenses: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpense,
});

export default connect(mapStateToProps)(Wallet);
