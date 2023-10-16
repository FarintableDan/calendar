import { createStore, compose } from "redux";

import mainReducer from "./reducer";

export const store = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)(mainReducer);
