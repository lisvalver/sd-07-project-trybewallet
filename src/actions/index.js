export const SET_EMAIL = 'SET_EMAIL'
export const IS_FETCHING = 'IS_FETCHING'
export const SET_DATA = 'SET_DATA'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const DEL_EXPENSE = 'DEL_EXPENSE'
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
export const SET_EDIT_BY_ID = 'SET_EDIT_BY_ID'
export const CURRENCY_ID_INCREMENT = 'CURRENCY_ID_INCREMENT'

export const setEmail = (email) => {
    return {
        type: SET_EMAIL,
        email,
    }
}

export const setIsFetching = () => {
    return {
        type: IS_FETCHING,
    }
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        data,
    }
}

export const getData = () => {
    return async (dispatch) => {
        dispatch(setIsFetching())
        const data = await fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json())
        delete data.USDT
        dispatch(setData(data))
        // const dataWithoutUSDT = Object.fromEntries(Object.entries(data).filter(e => e[0] != 'USDT'))
        // dispatch(setData(dataWithoutUSDT))
    }
}

export const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        expense,
    }
}
export const delExpense = (id) => {
    return {
        type: DEL_EXPENSE,
        id,
    }
}

export const editExpense = (id, newExpense) => {
    return {
        type: EDIT_EXPENSE,
        id,
        newExpense,
    }
}

export const setEditById = (id) => {
    return {
        type: SET_EDIT_BY_ID,
        id,
    }
}

export const currencyIdIncrement = () => {
    return { type: CURRENCY_ID_INCREMENT }
}