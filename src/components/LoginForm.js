import React from 'react';
import { connect } from 'react-redux';
import { logMeIn } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginCompare = this.loginCompare.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.loginCompare());
  }

  loginCompare() {
    const { senha } = this.state;
    const moreThanFive = 5;
    console.log(senha);
    if (senha.length > moreThanFive) (this.setState({ isDisable: false }));
    else (this.setState({ isDisable: true }));
  }

  handleClick(event) {
    const { history } = this.props;
    event.preventDefault();
    const { email } = this.state;
    history.push('carteira');
  }

  render() {
    const { email, senha, isDisable } = this.state;
    return (
      <div className="App">
        <section>
          <div className="board">
            <form className="form" onSubmit={ this.handleClick }>
              <input
                className="input"
                type="email"
                placeholder="Login"
                data-testid="email-input"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                data-testid="password-input"
                name="senha"
                value={ senha }
                onChange={ this.handleChange }
              />
              <button className="button" type="submit" disabled={ isDisable }>
                Entrar
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
});

const mapDispatchToProps = (dispatch) => ({
  log: (email) => dispatch(logMeIn(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
