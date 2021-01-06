// Esse reducer será responsável por tratar as informações da pessoa usuária
export const Types = {
    USER: 'USER'
};

const initialState = {
    user: {
        email:'',
        password: '',
    }
};

export default function user (state = initialState, action) {
    switch (action.type) {
        case Types.USER:
            console.log("user")
            return [...state, action.payload]  
        default:
            return state;
    }
}
