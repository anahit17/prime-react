import { customersState } from "./state";
import { ADD_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "./type";

export const customersReducer = (state = customersState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      state.customersData = action.value;
      break;
    case DELETE_CUSTOMER:
      state.customersData = state.customersData.filter(
        (customer) => customer.id !== +action.value
      );
      break;
    case UPDATE_CUSTOMER:
      console.log(action.value);
      state.customersData = state.customersData.map((customer) =>
        +customer.id === +action.value.id
          ? (customer = { ...action.value.data, id: action.value.id })
          : customer
      );
      break;
    default:
      break;
  }
  return { ...state };
};
