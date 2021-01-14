import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { apiAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { callApi } = this.props;
    callApi();
  }

  render() {
    return (
      <main>
        <Header />
        <Form />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callApi: () => dispatch(apiAction()),
});

Wallet.propTypes = { callApi: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Wallet);
