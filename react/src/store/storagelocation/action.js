import { ADD_STORAGE_LOCATION, DELETE_STORAGE_LOCATION, UPDATE_STORAGE_LOCATION } from "./type";

export const setStorageLocation = (value) => {
  return { type: ADD_STORAGE_LOCATION, value: value };
};

export const deleteStorageLocationData = (value) => {
  return { type: DELETE_STORAGE_LOCATION, value: value };
};

export const updateStorageLocation = (value) => {
  return { type: UPDATE_STORAGE_LOCATION, value: value };
};