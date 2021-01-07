import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions';

class Login extends React.Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
      autentic: false,
    };

    this.validacaoEmail = this.validacaoEmail.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

    validacaoEmail ({ target }) {
      const { value } = target;
      this.setState({ email: value }, () => {
        const usuario = target.value.substring(0, target.value.indexOf("@"));
        const dominio = target.value.substring(target.value.indexOf("@")+ 1, target.value.length);

        if ((usuario.length >=1) &&
          (dominio.length >=3) &&
          (usuario.search("@")==-1) &&
          (dominio.search("@")==-1) &&
          (usuario.search(" ")==-1) &&
          (dominio.search(" ")==-1) &&
          (dominio.search(".")!=-1) &&
          (dominio.indexOf(".") >=1)&&
          (dominio.lastIndexOf(".") < dominio.length - 1)){
            this.setState({ autentic: true });
          }
        else{
          this.setState({ autentic: false });
        }
    });
  }

  passwordValidation ({ target }) {
    this.setState({ password: target.value });
    if (target.valeu < 6) { this.setState({ autentic: true }); }
    else { this.setState({ autentic: false }); }
  } 

  render() {
    console.log(this.props)
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.validacaoEmail(event) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => this.passwordValidation(event) }
          />
          <button 
            type="button"
            disabled={ !this.state.autentic }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

/*
const mapDispatchToProps = {
  login(user);
}
*/

export default connect(mapStateToProps)(Login);
