import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Form from '../components/form';
import EditForm from '../components/editForm';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    const { editInfo } = this.props;
    const isEdit = editInfo ? Object.keys(editInfo).length : 0;
    return (
      <div>
        TrybeWallet
        <Header />
        {isEdit === 0 ? <Form /> : <EditForm />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editInfo: state.wallet.editInfo,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  editInfo: PropTypes.object,
}.isRequired;
