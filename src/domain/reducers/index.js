import { combineReducers } from "redux";
import loggedReducer from "./loggedReducer";
import calendarReducer from "./calendarReducer";

const allReducers = combineReducers({
  logged: loggedReducer,
  calendar: calendarReducer,
});

export default allReducers;
