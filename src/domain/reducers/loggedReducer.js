const initialProps = {
  stateLogged: false,
  stateToken: "",
  stateUserType: "",
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "STATE_LOGGED":
      return {
        ...state,
        stateLogged: action.payload.logged,
        stateToken: action.payload.token,
        stateUserType: action.payload.type,
      };
    default:
      return state;
  }
}
