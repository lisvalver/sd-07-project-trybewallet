import React from 'react';

class WalletFunction extends React.Component {
  render() {
    return (
      <div className="container-function">
        <label htmlFor="valor">
          Valor:
          <input type="text" id="valor" className="input-function" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            <option>  </option>
          </select>
        </label>
        <label htmlFor="pagamento">
          Metodo de pagamento:
          <select id="moeda">
            <option value="null">  </option>
            <option value="money"> Dinheiro </option>
            <option value="card"> Cartão </option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag">
            <option value="null"> </option>
            <option value="alimentação"> Alimentação </option>
            <option value="lazer"> Lazer </option>
            <option value="trabalho"> Trabalho </option>
            <option value="transporte"> Transporte </option>
            <option value="saúde"> Saúde </option>
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input type="text" id="descricao" />
        </label>
        <button className="btn-wallet" type="submit">
          Adcionar despesa
        </button>
      </div>
    );
  }
}

export default WalletFunction;
