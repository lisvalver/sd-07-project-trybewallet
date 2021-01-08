import React from 'react';

import Header from '../../components/Header';
import FormDespesa from '../../components/FormDespesa';
import TableDespesa from '../../components/TableDespesa';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <FormDespesa />
          <TableDespesa />
        </div>
      </div>
    );
  }
}

export default Wallet;
