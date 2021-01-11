import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;

    return (
      <div>
        <div>
          <span>E-mail do usuário:</span>
          <h4 data-testid="email-field">{ email }</h4>
        </div>
        <div>
          <span>Valor total:</span>
          <h4 data-testid="total-field">{ total }</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
