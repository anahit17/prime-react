import { clientsState } from "./state";
import { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from "./type";

export const clientsReducer = (state = clientsState, action) => {
  switch (action.type) {
    case ADD_CLIENT:
      state.clientsData = action.value;
      break;
    case DELETE_CLIENT:
      state.clientsData = state.clientsData.filter(
        (client) => client.id !== +action.value
      );
      break;
    case UPDATE_CLIENT:
      console.log("action Value", action.value);
      state.clientsData = state.clientsData.map((client) =>
        +client.id === +action.value.id
          ? (client = { ...action.value.data, id: action.value.id })
          : client
      );
      console.log(" state.clientsData", state.clientsData);
      break;
    default:
      break;
  }
  return { ...state };
};
