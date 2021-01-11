import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginCompare = this.loginCompare.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.loginCompare);
  }

  loginCompare() {
    const { senha, email } = this.state;
    const minimunLength = 6;
    const emailFormat = /^.+@[a-zA-Z0-9_.%+-]+?\.[a-zA-Z]{2,3}$/;
    if (senha.length >= minimunLength && emailFormat.test(email)) {
      this.setState({ isDisable: false });
    } else this.setState({ isDisable: true });
  }

  handleClick(event) {
    const { log } = this.props;
    const { email } = this.state;
    event.preventDefault();
    log(email);
    // history.push('/carteira');
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

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  log: (email) => dispatch(LOGIN(email)),
});

LoginForm.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
