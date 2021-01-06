import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      validEmail: false,
      validPass: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validadeDatas = this.validadeDatas.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // isto é para o botão ficar inativo quando a página acabar de carregar
  componentDidMount() {
    this.enableButton();
  }

  async handleChange(chave, valor) {
    await this.setState({
      [chave]: valor,
    });
    this.validadeDatas();
  }

  handleClick(path) {
    const { addUser } = this.props;
    const { email } = this.state;
    addUser(email);
    const { history } = this.props;
    history.push(path);
  }

  enableButton() {
    const { validEmail, validPass } = this.state;
    const enterButton = document.getElementById('enterButton');
    if (validEmail === true && validPass === true) {
      enterButton.disabled = false;
    } else {
      enterButton.disabled = true;
    }
  }

  validadeDatas() {
    const regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const { email } = this.state;
    if (regex.test(String(email).toLowerCase()) === true) {
      this.setState({
        validEmail: true,
      });
    } else {
      this.setState({
        validEmail: false,
      });
    }
    const { senha } = this.state;
    const minLength = 6;
    if (senha.length >= minLength) {
      this.setState({
        validPass: true,
      });
    } else {
      this.setState({
        validPass: false,
      });
    }
    this.enableButton();
  }

  render() {
    return (
      <div>
        <form>
          <input
            onChange={ (event) => this.handleChange('email', event.target.value) }
            type="email"
            testid="email-input"
            placeholder="e-mail"
          />
          <input
            onChange={ (event) => this.handleChange('senha', event.target.value) }
            type="password"
            testid="password-input"
            placeholder="senha"
          />
          <button
            id="enterButton"
            type="button"
            onClick={ () => this.handleClick('/carteira') }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { addUser };

export default connect(null, mapDispatchToProps)(withRouter(Login));
