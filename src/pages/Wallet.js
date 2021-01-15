import React from 'react';
import { connect } from 'react-redux';
import { upDateCurrencies } from '../actions';
import WalletForm from '../components/WalletForm';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  componentDidMount() {
    const { upDateCurrenciesDispatch } = this.props;
    upDateCurrenciesDispatch();
  }

  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  upDateCurrenciesDispatch: () => dispatch(upDateCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
