import React from 'react';
import './styles.css';


function Table() {
  return(
      	<div>
          <div className='table'>
            <div>Descrição</div>
            <div>Tag</div>
            <div>Método de pagamento</div>
            <div>Valor</div>
            <div>Moeda</div>
            <div>Câmbio utilizado</div>
            <div>Valor convertido</div>
            <div>Moeda de conversão</div>
            <div>Editar/Excluir</div>
          </div>
        </div>
  )
}

export default Table;