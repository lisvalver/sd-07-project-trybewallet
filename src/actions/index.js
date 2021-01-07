export const addEmail = (email) => ({ type: 'ADD_EMAIL', email });
export const requisitarMoedas = () => ({ type: 'REQUISITAR_MOEDAS' });
const sucesso = (currencies) => ({ type: 'SUCESSO', currencies });

export function fetchMoedas() {
  return (dispatch) => {
    dispatch(requisitarMoedas)
      .then(() => fetch('https://economia.awesomeapi.com.br/json/all'))
      .then((resposta) => resposta.json())
      .then((moedas) => dispatch(sucesso(moedas)));
  };
}
