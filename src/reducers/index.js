import { combineReducers } from "redux";

import app from "./app";
import api from "./api";

const rootReducer = combineReducers({
  api,
  app
});

export default rootReducer;
