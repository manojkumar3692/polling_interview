export const adminReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_POLL":
      let storageArr: any = {
        ...state,
        polls: [...state.polls, action.payload],
      };
      localStorage.setItem("admin_poll", JSON.stringify(storageArr));
      return { ...state, polls: [...state.polls, action.payload] };
      break;
    case "DELETE_POLL":
      return {
        ...state,
        polls: state.polls.filter((each: any) => each.id !== action.payload),
      };
      break;
    case "SUBMIT_POLL":
      return { ...state, polls: action.payload };
    default:
      throw new Error("No Reducer");
  }
};
