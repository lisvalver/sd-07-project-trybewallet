import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 10, currency: 'BRL' };
  }

  render() {
    const { email } = this.props;
    const { total, currency } = this.state;

    return (
      <header>
        <p data-testid="email-field">{`E-mail: ${email}`}</p>
        <p data-testid="total-field">{`Despesa Total: R$ ${total}`}</p>
        <p data-testid="header-currency-field">{currency}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

WalletHeader.defaultProps = { email: 'ada@lovelace.com' };
WalletHeader.propTypes = { email: PropTypes.string };

export default connect(mapStateToProps)(WalletHeader);
