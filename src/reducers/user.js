// Esse reducer será responsável por tratar as informações da pessoa usuária
// Se está no reducer é porque já está naquela chave.

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default userReducer;
