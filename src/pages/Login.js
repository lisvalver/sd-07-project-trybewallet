import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form>
        <label htmlFor="title-login">TRYBE</label>   
        <fieldset>
          <input
            type="email"
            name="email"
            // value={}
            // onchange={}
            placeholder="hermione@trybe.com"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            // value={}
            // onchange={}
            placeholder="Senha"
            data-testid="password-input"
          />
          <button
            type="submit"
            // onClick={}
          >
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}

// mapStateToProps = (state) => {

// }

export default Login;
