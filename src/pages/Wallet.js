import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Header user={ user } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
