import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
    <div>
      <Header email={email} />
    </div>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Wallet);
