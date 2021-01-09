import React from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet';
import Header from '../components/HeaderWallet';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    // console.log(email)
    return (
      <div>
        <Header email={email} />
        <FormWallet />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps)(Wallet);
