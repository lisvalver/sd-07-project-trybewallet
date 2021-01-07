import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { emailInfo } = this.props;
    return (
      <div>
        <Header emailInfo={ emailInfo } />
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailInfo: state.user.email,
});

Wallet.propTypes = {
  emailInfo: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
