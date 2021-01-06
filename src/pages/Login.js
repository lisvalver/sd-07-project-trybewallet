import React from 'react';
import addUser from '../actions';
import {connect } from 'react-redux';

class Login extends React.Component {
  render() {
    const {addUser, history} = this.props;
    return (<div>
      <h1>Trybe Wallet</h1>
      <input
      type="email"
      data-testid="email-input"
      placeholder="Insira seu e-mail"
      className="inputLogin"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <input 
      type="password"
      data-testid="password-input"
      className="inputLogin"
      pattern=".{6,}"
      />
      <button
      className="buttonLogin"
      onClick={() => {}}>
        Entrar
      </button>
    </div>);
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addUser: (email, password) => dispatch(addUser(email, password))
  }
};

export default connect(null, mapDispatchToProps)(Login);

/*

class Product extends React.Component {
    render() {
        const {nome, img, price, onProductAd} = this.props
        return (
            <div>
                <img src={img}/>
                <h4>{nome}</h4>
                <p>{price}</p>
                <button onClick ={()=> onProductAd(nome,price)}>Adicionar</button>
            </div>
        )
    }
}

const ProductList = ({ productsInList, adicionarItem }) => {
   return productsInList.map(item => <Product nome = {item.title} img = {item.imagem} price = {item.price} onProductAd= {adicionarItem}/>)
}

function mapDispatchToProps (dispatch) {
    return {
        adicionarItem: (nome, preco) => dispatch(adicionarItem(nome, preco))
    }
};

export default connect(null, mapDispatchToProps)(ProductList);
 */