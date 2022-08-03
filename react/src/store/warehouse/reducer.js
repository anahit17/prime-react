import { warehouseState } from "./state";
import { ADD_WAREHOUSE, DELETE_WAREHOUSE, UPDATE_WAREHOUSE } from "./type";
export const warehouseReducer = (state = warehouseState, action) => {
  switch (action.type) {
    case ADD_WAREHOUSE:
      state.warehouseData = action.value;
      break;
    case DELETE_WAREHOUSE:
      state.warehouseData = state.warehouseData.filter(
        (warehouse) => warehouse.id !== +action.value
      );
      break;
    case UPDATE_WAREHOUSE:
      console.log("action Value", action.value);
      state.warehouseData = state.warehouseData.map((warehouse) =>
        +warehouse.id === +action.value.id
          ? (warehouse = { ...action.value.data, id: action.value.id })
          : warehouse
      );
      break;
    default:
      break;
  }
  return { ...state };
};
