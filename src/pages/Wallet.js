import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import WalletForm from '../component/WalletForm';
import EditForm from '../component/EditForm';

class Wallet extends React.Component {
  render() {
    const { editModeprops } = this.props;
    return (
      <div>
        <Header />
        {editModeprops ? <EditForm /> : <WalletForm />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editModeprops: state.wallet.editMode,
});

Wallet.propTypes = {
  editModeprops: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Wallet);
