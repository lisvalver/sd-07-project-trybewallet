import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableExpenses: [],
    }

    this.setTableData = this.setTableData.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount')
    this.setTableData();
  }

  // REVISAR TODO ESSE CÓDIGO. COMO ATUALIZAR A TABELA DINAMICAMENTE
  setTableData() {
    const { expenses } = this.props;
    let tableData = []
    expenses.forEach((data) => {
      tableData = [...tableData,
        {
          descricao: data.description,
          tag: data.tag,
          pagamento: data.method,
          valor: data.value,
          moeda: data.currency,
          // cambio,
          // valorConvertido,
          moedaConversao: 'BRL',
        }
      ]
    })
    this.setState({
      tableExpenses: tableData,
    })
  }

  render() {    
    return (
      <div>Tabela</div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses
})

export default connect(mapStateToProps)(Table);


// Descrição -> Vem do state global (expenses[0].description)
// Tag -> Vem do state global (expenses[0].tag)
// Método de pagamento -> Vem do state global (expenses[0].method)
// Valor -> Vem do state global (expenses[0].value)
// Moeda -> Vem do state global (expenses[0].currency)
// Câmbio utilizado -> Vem do state global (expenses[0].exchangeRates(find).ask)
// Valor convertido -> Cambio utilizado * Valor
// Moeda de conversão -> 'BRL' (a confirmar)