import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

  render() {
    return <div>
      {/* coloca um name e um value nas input */}
      <input data-testid="email-input"></input> 
      <input data-testid="password-input"></input>
      <button type="button">Entrar</button>
    </div>;
  }
}

const mapStateToProps = (store) => ({
  store,
})

export default Login;
