import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Despesas from '../components/Despesas';
import EditDespesas from '../components/EditDespesas';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }

  addIdWallet() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  render() {
    const { id } = this.state;
    const { edit } = this.props;
    return (
      <div>
        TrybeWallet
        <Header />
        { edit ? <EditDespesas id={ id } />
          : <Despesas id={ id } addIdWallet={ () => this.addIdWallet() } /> }
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  edit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
});

export default connect(mapStateToProps)(Wallet);
