import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import initialState from './initialState';
import usersReducer from './usersRedux';
import adsReducer from './adsRedux';
import thunk from 'redux-thunk';

// const reducer = (state, action) => {
//   return state;
// };

const subreducers = {
    users: usersReducer,
    ads: adsReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  //initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;