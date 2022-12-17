const initialProps = {
  stateLogged: false,
  stateToken: "",
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "STATE_LOGGED":
      return {
        ...state,
        stateLogged: action.payload.logged,
        stateToken: action.payload.token,
      };
    default:
      return state;
  }
}
