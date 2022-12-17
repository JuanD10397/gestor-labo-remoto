import { combineReducers } from "redux";
import loggedReducer from "./loggedReducer";
import calendarReducer from "./calendarReducer";
import counterReducer from "./counter";

const allReducers = combineReducers({
  logged: loggedReducer,
  counter: counterReducer,
  calendar: calendarReducer,
});

export default allReducers;
