//selectors 

import { API_URL } from "../config";

//actions
const createActionName = actionName => `app/lists/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOGIN_CHECK_SUCCESS = createActionName('LOGIN_CHECK_SUCCESS');
const LOGIN_CHECK_FAIL = createActionName('LOGIN_CHECK_FAIL');

// const ADD_COLUMN = createActionName('ADD_COLUMN');

//action creators


// thunk 
export const checkLogin = () => async (dispatch) => {
    try {
        const res = await fetch(
            `${API_URL}/auth/user`
            );
        const data = await res.json();
        if(data.login) {
            dispatch({
                type: 'LOGIN_CHECK_SUCCESS',
                payload: data,
            });
        } else {
            dispatch({
                type: 'USER_CHECK_FAIL', 
                payload: data.message,
            });
        }
    } catch (err) {
        dispatch({
            type: 'USER_CHECK_FAIL', 
            payload: err.message,
        });
    }
};

// export const addColumn = payload => ({type: ADD_COLUMN, payload});
export const logIn = payload => ({
    type: LOG_IN,
    payload
})

const usersReducer = (statePart = [], action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                ...statePart, 
                login: action.payload,
                error: null, // user was not logged so null
            };
        // case ADD_COLUMN:
        //     return [...statePart, { ...action.payload, id: shortid()}];
        case 'LOGIN_CHECK_SUCCESS': 
            return {
                ...statePart, 
                login: action.payload,
                error: null, // user was not logged so null
            };
        case 'USER_CHECK_FAIL':
            return {
                ...statePart,
                login: null, // error so user kicked
                error: action.payload,
            }
        default: 
        return statePart; 
    }
}

export default usersReducer; 