import { ADD_WAREHOUSE, DELETE_WAREHOUSE, UPDATE_WAREHOUSE } from "./type";

export const setWarehouse = (value) => {
  return { type: ADD_WAREHOUSE, value: value };
};

export const deleteWarehouseData = (value) => {
  return { type: DELETE_WAREHOUSE, value: value };
};

export const updateWarehouse = (value) => {
  return { type: UPDATE_WAREHOUSE, value: value };
};