const initialProps = {
  stateSchedule: [
    "Mon Dec 12 2022 05:00:00 GMT-0500 (Peru Standard Time)",
    "Tue Dec 13 2022 07:00:00 GMT-0500 (Peru Standard Time)",
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
