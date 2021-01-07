import React from 'react';

import Header from '../../components/Header';
import FormDespesa from '../../components/FormDespesa';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <FormDespesa />
        </div>
      </div>
    );
  }
}

export default Wallet;
