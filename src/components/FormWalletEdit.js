// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { editExpense } from '../actions';

// class FormWallet extends Component {
//   constructor() {
//     super();

//     this.getInformationsCost = this.getInformationsCost.bind(this);
//     this.updateCostEdit = this.updateCostEdit.bind(this);

//     this.state = {
//       payment: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
//       tagCost: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
//       cost: {
//         value: '',
//         description: '',
//         currency: 'USD',
//         method: 'Dinheiro',
//         tag: 'Alimentação',
//         id: '',
//       },
//     };
//   }

//   componentDidMount() {
//     this.updateCostEdit();
//   }

//   getInformationsCost({ target }) {
//     const { name, value } = target;
//     this.setState(({ cost }) => ({
//       cost: { ...cost, [name]: value },
//     }));
//   }

//   updateCostEdit() {
//     const { id, expenses } = this.props;
//     const obj =  expenses.find((obj) => obj.id === id);
//     const { value, description, currency, method, tag } = obj;
//     console.log(obj);
//     this.setState({
//       cost: {
//         value,
//         description,
//         currency,
//         method,
//         tag,
//         id
//       }
//     })
//   }

//   render() {
//     const { currencies, editForm } = this.props;
//     const { payment, tagCost, cost } = this.state;
//     const { value, description, currency, method, tag } = cost;
//     const filterCurrencies = currencies.filter((coin) => coin !== 'USDT');
//     // console.log(filterCurrencies);
//     return (
//       <form>
//         <fieldset>
//           <legend>Despesas</legend>
//           <div>
//             <label htmlFor="value">
//               VALOR
//               <input
//                 type="number"
//                 data-testid="value-input"
//                 name="value"
//                 id="value"
//                 value={ value }
//                 onChange={ this.getInformationsCost }
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="description">
//               DESCRIÇÃO
//               <input
//                 type="text"
//                 data-testid="description-input"
//                 name="description"
//                 id="description"
//                 value={ description }
//                 onChange={ this.getInformationsCost }
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="currency">
//               MOEDA
//               <select
//                 data-testid="currency-input"
//                 name="currency"
//                 id="currency"
//                 value={ currency }
//                 onChange={ this.getInformationsCost }
//                 required
//               >
//                 {filterCurrencies.map((coin) => (
//                   <option key={ coin } data-testid={ coin }>
//                     {coin}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <label htmlFor="method">
//               PAGAMENTO
//               <select
//                 data-testid="method-input"
//                 name="method"
//                 id="method"
//                 value={ method }
//                 onChange={ this.getInformationsCost }
//                 required
//               >
//                 {payment.map((payMethod) => (
//                   <option key={ payMethod }>{payMethod}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <label htmlFor="tag">
//               TAG
//               <select
//                 data-testid="tag-input"
//                 name="tag"
//                 id="tag"
//                 value={ tag }
//                 onChange={ this.getInformationsCost }
//                 required
//               >
//                 {tagCost.map((expenseTag) => (
//                   <option key={ expenseTag }>{expenseTag}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//         </fieldset>
//         <button
//           type="button"
//           onClick={ () => {
//             editForm(cost);
//           } }
//         >
//           Editar despesa
//         </button>
//       </form>
//     );
//   }
// }

// const mapStateToProps = ({ wallet }) => ({
//   currencies: wallet.currencies,
//   expenses: wallet.expenses,
// });

// const mapDispatchToProps = (dispatch) => ({
//   editForm: (cost) => dispatch(editExpense(cost)),
// });

// FormWallet.propTypes = {
//   currencies: PropTypes.arrayOf(String).isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
