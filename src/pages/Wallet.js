import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return <div>carteira</div>;
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
