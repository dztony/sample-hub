import { createStore, combineReducers } from "@/myRedux";
import counterReducer from "@/state/feature/counterReducer";
import applyMiddleware from "@/myRedux/applyMiddleware";
import logger from "@/middleware/logger";
import loggerV2 from "@/middleware/loggerV2";
import thunk from "@/middleware/thunk";

const reducers = combineReducers({
  counter: counterReducer,
});

const middlewareList = [
  logger,
  loggerV2,
  thunk,
];

const store = applyMiddleware(middlewareList)(createStore)(reducers);

export default store;
