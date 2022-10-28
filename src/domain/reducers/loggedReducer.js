const initialProps = {
  stateLogged: false,
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "STATE_LOGGED":
      return {
        ...state,
        stateLogged: action.payload,
      };
    default:
      return state;
  }
}
