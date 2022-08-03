import { combineReducers } from "redux";
import { clientsReducer } from "./client/reducer";
import { customersReducer } from "./customer/reducer";
import { storageLocationReducer } from "./storagelocation/reducer";
import { suppliersReducer } from "./supplier/reducer";
import { warehouseReducer } from "./warehouse/reducer";
export const reducers = combineReducers({
  clientsData: clientsReducer,
  customersData: customersReducer,
  suppliersData: suppliersReducer,
  warehouseData: warehouseReducer,
  storageLocationData: storageLocationReducer,
});
