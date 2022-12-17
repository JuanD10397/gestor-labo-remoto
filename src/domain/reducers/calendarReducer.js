const initialProps = {
  stateSchedule: [
    "Tue Dec 20 2022 00:00:00 GMT-0500 (Peru Standard Time)",
    "Tue Dec 20 2022 02:00:00 GMT-0500 (Peru Standard Time)",
  ],
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
