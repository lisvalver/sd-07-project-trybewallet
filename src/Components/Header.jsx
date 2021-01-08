import React from 'react';
import Logo from '../images/logo-wallet.jpg';

class Header extends React.Component {
  render() {
    const { user, amount } = this.props;
    return (
      <div className="container-header">
        <div className="logo-wallet">
          <img src={ Logo } alt="logo" />
        </div>
        <div className="status-wallet">
          <div className="user-wallet">
            <p className="label">Email:</p>
            { user }
          </div>
          <div className="amount-wallet">
            <p className="label">Despesas:</p>
            { amount }
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
