import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddForm from './AddForm';
import TabelaGastos from './TabelaGastos';
import { getData } from '../actions';

const Wallet = (props) => {
  const [total, setTotal] = useState(0);

  const {
    expenses: expensesProps,
    editById: editByIdProps,
    email: emailProps,
  } = props;

  const atualizarTotal = () => {
    setTotal(
      expensesProps.reduce((acc, despesa) => {
        const valorDespesa = despesa.value;
        const moedaDespesa = despesa.currency;
        const valorMoedaDespesa = (
          Object.entries(despesa.exchangeRates)
            .find((e) => e[1].code === moedaDespesa)[1].ask);
        acc += valorMoedaDespesa * valorDespesa;
        return acc;
      }, 0),
    );
  };

  useEffect(() => {
    props.getData();
  }, []);

  useEffect(() => {
    atualizarTotal();
  }, [expensesProps, editByIdProps]);

  return (
    <div>
      <header>
        <h1 data-testid="email-field">
          Email:
          {' '}
          {emailProps}
        </h1>
        <p data-testid="total-field">
          total: R$
          {total.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
        <AddForm />
      </header>
      <TabelaGastos />
    </div>
  );
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  data: store.wallet.currencies,
  editById: store.wallet.editById,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getData: PropTypes.func.isRequired,
  editById: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
