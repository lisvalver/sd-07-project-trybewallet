import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getEmail } = this.props;
    const initialValue = 0;
    return (
      <div>
        <div data-testid="email-field">
          E-mail:
          { getEmail }
        </div>
        <div data-testid="total-field">
          { initialValue }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
});

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
