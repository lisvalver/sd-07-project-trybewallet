import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p data-testid="total-field">{/**/}</p>
        </div>
        <div>
          <p data-testid="header-currency-field">{/**/}</p>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletHeader);