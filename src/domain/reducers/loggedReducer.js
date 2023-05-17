const initialProps = {
  stateToken: "",
  stateUserType: "",
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "STATE_LOGGED":
      return {
        ...state,
        stateToken: action.payload.token,
        stateUserType: action.payload.type,
      };
    default:
      return state;
  }
}
