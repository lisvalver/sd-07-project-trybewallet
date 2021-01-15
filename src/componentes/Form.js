import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  render() {
    return (

      <form>
        <label htmlFor="valor">
          Valor:
          <input name="valor" data-testid="value-input" />
        </label>

        <select data-testid="currency-input">
          <option>Moeda:</option>
        </select>
        <select
          data-testid="method-input"
        >
          <option value="">Metodo de Pagamento:</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option>Tag:</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <label htmlFor="descricao">
          Descrição:
          <input name="descricao" data-testid="description-input" />
        </label>
        <button type="button">Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Form);
