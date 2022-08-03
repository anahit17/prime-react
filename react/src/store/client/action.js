import { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from "./type";

export const setClients = (value) => {
  return { type: ADD_CLIENT, value: value };
};

export const deleteClientData = (value) => {
  return { type: DELETE_CLIENT, value: value };
};

export const updateClient = (value) => {
  return { type: UPDATE_CLIENT, value: value };
};

