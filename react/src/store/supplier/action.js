import { ADD_SUPPLIER, DELETE_SUPPLIER, UPDATE_SUPPLIER } from "./type";

export const setSuppliers = (value) => {
  return { type: ADD_SUPPLIER, value: value };
};

export const deleteSupplierData = (value) => {
  return { type: DELETE_SUPPLIER, value: value };
};

export const updateSupplier = (value) => {
  return { type: UPDATE_SUPPLIER, value: value };
};

