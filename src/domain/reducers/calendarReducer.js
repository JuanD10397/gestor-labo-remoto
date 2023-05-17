const initialProps = {
  // stateSchedule: [
  //   "Tue Dec 29 2022 00:00:00 GMT-0500 (Peru Standard Time)",
  //   "Tue Dec 30 2022 02:00:00 GMT-0500 (Peru Standard Time)",
  // ],
  stateSchedule: [],
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "REGISTER_SCHEDULE":
      return {
        ...state,
        stateSchedule: action.payload,
      };
    default:
      return state;
  }
}
