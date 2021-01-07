import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
    <div>      
      <span data-testid='email-field'>
        Usuário: { email }
      </span>
      
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email
})

export default connect(mapStateToProps)(Header);
