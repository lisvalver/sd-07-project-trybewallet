import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { upDateCurrencies } from '../actions';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  componentDidMount() {
    const { upDateCurrenciesDispatch } = this.props;
    upDateCurrenciesDispatch();
  }

  render() {
    return (
      <>
        <WalletHeader />
        <WalletForm />
        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  upDateCurrenciesDispatch: () => dispatch(upDateCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  upDateCurrenciesDispatch: PropTypes.func.isRequired,
};
