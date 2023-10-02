import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import pagesReducer from "./pagesReducer";

const rootReducer = combineReducers({
  alertReducer,
  pagesReducer,
});
export default rootReducer;
