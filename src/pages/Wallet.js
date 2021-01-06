import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    // const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field" />
          <p>Despesa Total: </p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>);
  }
}
const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Wallet);
