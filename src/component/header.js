import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, amount } = this.props;

    return (
      <header>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <span data-testid="total-field">
          { amount }
        </span>
        <div data-testid="header-currency-field">
          Câmbio: BRL
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.wallet.value,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
