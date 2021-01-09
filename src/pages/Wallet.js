import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import Edit from '../components/Edit';
import List from '../components/List';

class Wallet extends React.Component {
  render() {
    const { isEdit } = this.props;
    return (
      <div>
        <header>
          <Header />
          {(isEdit >= 0) ? <Edit /> : <Form />}
          <List />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.wallet.isEdit,
});

Wallet.propTypes = {
  isEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Wallet);
