import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import store from '../store'

class Login extends React.Component {
  render() {
    const { email, password } = this.state;
    console.log(email, store)
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="e-mail"
          value={ email }
          onChange={}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="senha"
          value={ password }
          onChange={}
        />
        <Link to="/carteira">Entrar</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
