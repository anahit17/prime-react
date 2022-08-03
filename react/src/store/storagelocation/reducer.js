import { storageLocationState } from "./state";
import { ADD_STORAGE_LOCATION, DELETE_STORAGE_LOCATION, UPDATE_STORAGE_LOCATION } from "./type";

export const storageLocationReducer = (
  state = storageLocationState,
  action
) => {
  switch (action.type) {
    case ADD_STORAGE_LOCATION:
      state.storageLocationData = action.value;
      break;
    case DELETE_STORAGE_LOCATION:
      state.storageLocationData = state.storageLocationData.filter(
        (storLoc) => storLoc.id !== +action.value
      );
      break;
      case UPDATE_STORAGE_LOCATION:
        state.storageLocationData = state.storageLocationData.map((storLoc) =>
          +storLoc.id === +action.value.id
            ? (storLoc = { ...action.value.data, id: action.value.id })
            : storLoc
        );
        break;
    default:
      break;
  }
  return { ...state };
};
