import { suppliersState } from "./state";
import { ADD_SUPPLIER, DELETE_SUPPLIER, UPDATE_SUPPLIER } from "./type";

export const suppliersReducer = (state = suppliersState, action) => {
  switch (action.type) {
    case ADD_SUPPLIER:
      state.suppliersData = action.value;
      break;
    case DELETE_SUPPLIER:
      state.suppliersData = state.suppliersData.filter((supplier) => supplier.id !== +action.value.id);
      break;
      case UPDATE_SUPPLIER:
        state.suppliersData = state.suppliersData.map((supplier) =>
        +supplier.id === +action.value.id
          ? (supplier = { ...action.value.data, id: action.value.id })
          : supplier
      );
      break;
    default:
      break;
  }
  return { ...state };
};
