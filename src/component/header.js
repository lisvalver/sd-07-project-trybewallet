import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { format } = new Intl.NumberFormat('pt-BR',
  { maximumFractionDigits: 2, minimumFractionDigits: 2 });

class Header extends React.Component {
  render() {
    const { email, amount } = this.props;

    return (
      <header>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">
          { amount ? format(amount) : 0 }
        </div>
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
