import { ADD_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "./type";

export const setCustomers = (value) => {
  return { type: ADD_CUSTOMER, value: value };
};

export const deleteCustomerData = (value) => {
  return { type: DELETE_CUSTOMER, value: value };
};

export const updateCustomer = (value) => {
  return { type: UPDATE_CUSTOMER, value: value };
};
