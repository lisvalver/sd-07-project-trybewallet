import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    const { currency } = expenses;
    console.log(currency);
    return (
      <table>
        <thead>
          <tr>
            <th className="description">Descrição</th>
            <th className="description">Tag</th>
            <th className="description">Método de pagamento</th>
            <th className="description">Valor</th>
            <th className="description">Moeda</th>
            <th className="description">Câmbio utilizado</th>
            <th className="description">Valor convertido</th>
            <th className="description">Moeda de conversão</th>
          </tr>
        </thead>
        <tbody className="request">
          { Object.values(expenses).map((item, index) => (
            <tr key={ index }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{item.currency}</td>
              <td>{}</td>
              <td>Real Brasileiro</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ user: { email },
  wallet: { currencies, isFetching, expenses } }) => ({
  email,
  currencies,
  isFetching,
  expenses,
});

export default connect(mapStateToProps, null)(Table);