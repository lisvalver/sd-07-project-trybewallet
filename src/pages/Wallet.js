import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import WalletFunction from '../Components/WalletFunction';
import WalletEdit from '../Components/WalletEdit';
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
    const { email, totalExpenses, isEdit } = this.props;
    const base = 10;
    const result = parseFloat(totalExpenses, base).toFixed(2);
    return (
      <div className="container-wallet">
        <Header
          user={ email }
          amount={ totalExpenses === 0 ? 0 : result }
          cambio={ cambio }
        />
        <div className="body-wallet">
          {isEdit === true ? <WalletEdit /> : <WalletFunction />}
          <Table />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpense,
  isEdit: state.wallet.isEdit,
});

export default connect(mapStateToProps)(Wallet);
