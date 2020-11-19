import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import authReduxer from "../reducers/auth";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

//it allows us to apply middleware and use redux dev tools in the same time
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  // Store creation
  const store = createStore(
    combineReducers({
      auth: authReduxer,
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
