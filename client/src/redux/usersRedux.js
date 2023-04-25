//selectors 

//actions
const createActionName = actionName => `app/lists/${actionName}`;
const LOG_IN = createActionName('LOG_IN');

// const ADD_COLUMN = createActionName('ADD_COLUMN');

// //action creators
// export const addColumn = payload => ({type: ADD_COLUMN, payload});
export const logIn = payload => ({
    type: LOG_IN,
    payload
})

const usersReducer = (statePart = [], action) => {
    switch(action.type) {
        case LOG_IN:
            return action.payload;
        // case ADD_COLUMN:
        //     return [...statePart, { ...action.payload, id: shortid()}];
        default: 
        return statePart; 
    }
}

export default usersReducer; 