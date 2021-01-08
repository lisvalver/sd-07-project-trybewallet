import React from 'react';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    const { expenses } = this.props
   return (
     <ul>
       {expenses.map(({cash,currency,methodInput,tagInput,infor,id}) => {
        return (<li>
           <div>{cash}</div>
           <div>{currency}</div>
           <div>{methodInput}</div>
           <div>{tagInput}</div>
           <div>{infor}</div>
           <div>{id}</div>
         </li>)
       })}
     </ul>
   );
  }
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Expenses);